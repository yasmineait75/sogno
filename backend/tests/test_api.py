"""Backend API tests for Le Jean Michel Breizh."""
import os
import pytest
import requests
from datetime import datetime, timedelta

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://breizh-kitchen.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Restaurant info
def test_get_restaurant(client):
    r = client.get(f"{API}/restaurant", timeout=20)
    assert r.status_code == 200
    d = r.json()
    assert d["name"] == "Le Jean Michel Breizh"
    assert "address" in d and "7 rue Gros" in d["address"]
    assert isinstance(d["hours"], list) and len(d["hours"]) == 7


# Reservations
def _future_date():
    # pick a Tuesday at least 7 days out
    d = datetime.now() + timedelta(days=7)
    while d.weekday() != 1:  # 1 = Tuesday
        d += timedelta(days=1)
    return d.strftime("%Y-%m-%d")


def test_create_reservation_and_persist(client):
    payload = {
        "name": "TEST_Jean Dupont",
        "email": "test_jean@example.com",
        "phone": "0612345678",
        "date": _future_date(),
        "time": "19:30",
        "guests": 2,
        "notes": "TEST allergie noisette",
    }
    r = client.post(f"{API}/reservations", json=payload, timeout=20)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["guests"] == 2
    assert data["status"] == "pending"
    assert "id" in data and len(data["id"]) > 0
    assert "created_at" in data
    rid = data["id"]

    # GET list verifies persistence, no _id leakage
    r2 = client.get(f"{API}/reservations", timeout=20)
    assert r2.status_code == 200
    lst = r2.json()
    assert isinstance(lst, list)
    for item in lst:
        assert "_id" not in item
    ids = [x["id"] for x in lst]
    assert rid in ids


def test_reservation_validation_email(client):
    payload = {
        "name": "TEST Bob",
        "email": "not-an-email",
        "phone": "0612345678",
        "date": _future_date(),
        "time": "19:30",
        "guests": 2,
    }
    r = client.post(f"{API}/reservations", json=payload, timeout=20)
    assert r.status_code == 422


def test_reservation_validation_guests_range(client):
    payload = {
        "name": "TEST Bob",
        "email": "bob@example.com",
        "phone": "0612345678",
        "date": _future_date(),
        "time": "19:30",
        "guests": 25,
    }
    r = client.post(f"{API}/reservations", json=payload, timeout=20)
    assert r.status_code == 422


def test_reservation_validation_name_min_length(client):
    payload = {
        "name": "A",
        "email": "bob@example.com",
        "phone": "0612345678",
        "date": _future_date(),
        "time": "19:30",
        "guests": 2,
    }
    r = client.post(f"{API}/reservations", json=payload, timeout=20)
    assert r.status_code == 422


# Contact
def test_create_contact(client):
    payload = {
        "name": "TEST Alice",
        "email": "test_alice@example.com",
        "subject": "Question",
        "message": "Bonjour, avez-vous des options sans gluten ?",
    }
    r = client.post(f"{API}/contact", json=payload, timeout=20)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["message"] == payload["message"]
    assert "id" in data
    cid = data["id"]

    # GET list - verify persisted and no _id
    r2 = client.get(f"{API}/contact", timeout=20)
    assert r2.status_code == 200
    lst = r2.json()
    for item in lst:
        assert "_id" not in item
    assert cid in [x["id"] for x in lst]


def test_contact_validation_email(client):
    payload = {"name": "TEST C", "email": "bad", "message": "Hello world"}
    r = client.post(f"{API}/contact", json=payload, timeout=20)
    assert r.status_code == 422


def test_contact_validation_message_min(client):
    payload = {"name": "TEST C", "email": "c@example.com", "message": "Hi"}
    r = client.post(f"{API}/contact", json=payload, timeout=20)
    assert r.status_code == 422
