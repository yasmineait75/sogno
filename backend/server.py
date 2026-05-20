from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Optional Resend email integration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '').strip()
RESEND_FROM = os.environ.get('RESEND_FROM', 'Sogno Paris <noreply@sogno-paris.fr>')
_resend = None
if RESEND_API_KEY:
    try:
        import resend as _resend_mod
        _resend_mod.api_key = RESEND_API_KEY
        _resend = _resend_mod
    except Exception as _e:  # pragma: no cover - defensive
        logging.getLogger(__name__).warning("Resend import failed: %s", _e)

# Create the main app without a prefix
app = FastAPI(title="Sogno — Ristorante Italiano API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============= MODELS =============

class Reservation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    restaurant: str = "sogno"
    name: str
    email: EmailStr
    phone: str
    date: str  # ISO date string, e.g. "2026-06-15"
    time: str  # HH:MM e.g. "19:30"
    guests: int
    notes: Optional[str] = ""
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ReservationCreate(BaseModel):
    restaurant: str = Field(default="sogno", pattern="^sogno$")
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=5, max_length=40)
    date: str
    time: str
    guests: int = Field(ge=1, le=20)
    notes: Optional[str] = Field(default="", max_length=1000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    restaurant: str = "sogno"
    name: str
    email: EmailStr
    subject: Optional[str] = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    restaurant: str = Field(default="sogno", pattern="^sogno$")
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(default="", max_length=200)
    message: str = Field(min_length=5, max_length=2000)


# ============= ROUTES =============

@api_router.get("/")
async def root():
    return {"message": "Sogno — Ristorante Italiano API"}


@api_router.post("/reservations", response_model=Reservation)
async def create_reservation(payload: ReservationCreate):
    obj = Reservation(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.reservations.insert_one(doc)
    _send_reservation_email(obj)
    return obj


def _send_reservation_email(res: 'Reservation') -> None:
    """Fire-and-forget confirmation email. Never raises."""
    if not _resend:
        logging.getLogger(__name__).info(
            "Reservation %s saved — email skipped (RESEND_API_KEY not set)", res.id
        )
        return
    try:
        time_fr = res.time.replace(':', 'h') if res.time else ''
        html = (
            f"<div style=\"font-family:Georgia,'Bodoni Moda',serif;color:#2C3E38;"
            f"max-width:560px;margin:0 auto;padding:40px 32px;background:#F9F6F0;"
            f"border:1px solid #E5DFD3;\">"
            f"<p style=\"font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.28em;"
            f"text-transform:uppercase;color:#1F4E5F;margin:0 0 24px;\">— Sogno · Paris</p>"
            f"<h1 style=\"font-size:32px;font-weight:400;font-style:italic;margin:0 0 20px;\">"
            f"Grazie {res.name.split(' ')[0]},</h1>"
            f"<p style=\"font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#5C6B66;\">"
            f"Votre table est réservée. Voici les détails de votre venue :</p>"
            f"<div style=\"font-family:Arial,sans-serif;font-size:14px;line-height:1.9;"
            f"color:#2C3E38;padding:20px 0;border-top:1px solid #E5DFD3;"
            f"border-bottom:1px solid #E5DFD3;margin:24px 0;\">"
            f"<div><strong>Date</strong> · {res.date}</div>"
            f"<div><strong>Horaire</strong> · {time_fr}</div>"
            f"<div><strong>Couverts</strong> · {res.guests}</div>"
            f"</div>"
            f"<p style=\"font-family:Arial,sans-serif;font-size:13px;line-height:1.7;color:#5C6B66;\">"
            f"Notre maître d'hôtel confirme votre réservation dans la journée.<br>"
            f"À très vite — 42 Rue de l'Amiral Hamelin, 75016 Paris.</p>"
            f"<p style=\"font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.2em;"
            f"text-transform:uppercase;color:#5C6B66;margin-top:32px;\">Sogno · Ristorante Italiano</p>"
            f"</div>"
        )
        _resend.Emails.send({
            "from": RESEND_FROM,
            "to": [res.email],
            "subject": f"Sogno · Votre table le {res.date} à {res.time}",
            "html": html,
        })
        logging.getLogger(__name__).info("Confirmation email sent to %s", res.email)
    except Exception as e:
        logging.getLogger(__name__).warning(
            "Resend send failed for reservation %s: %s", res.id, e
        )


@api_router.get("/reservations", response_model=List[Reservation])
async def list_reservations():
    items = await db.reservations.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            try:
                it['created_at'] = datetime.fromisoformat(it['created_at'])
            except Exception:
                pass
    return items


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    obj = ContactMessage(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return obj


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact():
    items = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            try:
                it['created_at'] = datetime.fromisoformat(it['created_at'])
            except Exception:
                pass
    return items


# Public restaurant info endpoint
@api_router.get("/restaurant/sogno")
async def get_sogno_info():
    return {
        "name": "Sogno",
        "tagline": "Ristorante Italiano  •  Trocadéro",
        "address": "42 Rue de l'Amiral Hamelin, 75016 Paris",
        "phone": "+33 1 47 04 02 02",
        "email": "ciao@sogno-paris.fr",
        "hours": [
            {"day": "Lundi", "value": "12h00 – 14h30  •  19h00 – 23h00"},
            {"day": "Mardi", "value": "12h00 – 14h30  •  19h00 – 23h00"},
            {"day": "Mercredi", "value": "12h00 – 14h30  •  19h00 – 23h00"},
            {"day": "Jeudi", "value": "12h00 – 14h30  •  19h00 – 23h30"},
            {"day": "Vendredi", "value": "12h00 – 14h30  •  19h00 – 23h30"},
            {"day": "Samedi", "value": "19h00 – 23h30"},
            {"day": "Dimanche", "value": "Fermé"},
        ],
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
