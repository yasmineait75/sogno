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
    return obj


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
