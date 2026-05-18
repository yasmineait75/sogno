"""Backend API tests for Sogno — Ristorante Italiano."""
import os
import pytest
import requests
from datetime import datetime, timedelta

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "http://localhost:8001").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def _future_date():
    d = datetime.now() + timedelta(days=7)
    while d.weekday() != 1:  # Tuesday
        d += timedelta(days=1)
    return d.strftime("%Y-%m-%d")


# Restaurant info
def test_get_restaurant_sogno(client):
    r = client.get(f"{API}/restaurant/sogno", timeout=20)
    assert r.status_code == 200
    d = r.json()
    assert d["name"] == "Sogno"
    assert "42 Rue de l'Amiral Hamelin" in d["address"]
    assert isinstance(d["hours"], list) and len(d["hours"]) == 7


# Reservations
def test_create_reservation_and_persist(client):
    payload = {
        "name": "TEST_Sogno User",
        "email": "test_sogno@example.com",
        "phone": "0612345678",
        "date": _future_date(),
        "time": "19:30",
        "guests": 2,
        "notes": "TEST allergie",
    }
    r = client.post(f"{API}/reservations", json=payload, timeout=20)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["guests"] == 2
    assert data["status"] == "pending"
    assert data["restaurant"] == "sogno"
    assert "id" in data and len(data["id"]) > 0
    rid = data["id"]

    r2 = client.get(f"{API}/reservations", timeout=20)
    assert r2.status_code == 200
    lst = r2.json()
    assert isinstance(lst, list)
    for item in lst:
        assert "_id" not in item
    assert rid in [x["id"] for x in lst]


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


def test_reservation_invalid_restaurant_rejected(client):
    payload = {
        "restaurant": "breizh",
        "name": "TEST_BadRest",
        "email": "test_bad@example.com",
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
        "message": "Buonasera, avez-vous une carte sans gluten ?",
    }
    r = client.post(f"{API}/contact", json=payload, timeout=20)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["restaurant"] == "sogno"
    assert data["name"] == payload["name"]
    cid = data["id"]

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


def test_contact_invalid_restaurant_rejected(client):
    payload = {
        "restaurant": "breizh",
        "name": "TEST_BadRest",
        "email": "test_bad@example.com",
        "message": "Hello, this is a test message.",
    }
    r = client.post(f"{API}/contact", json=payload, timeout=20)
    assert r.status_code == 422
