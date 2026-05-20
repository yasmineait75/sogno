"""Vercel serverless entry point for the Sogno FastAPI backend.

This file is required because Vercel discovers serverless functions in /api/.
It loads the existing FastAPI `app` defined in /backend/server.py and re-exports
it so Vercel's @vercel/python runtime can serve it as an ASGI application.

Routing: vercel.json rewrites /api/(.*)  ->  /api/index, so all /api/* HTTP
requests are handled by the FastAPI router defined in server.py.
"""
import os
import sys

# Ensure /backend is importable from this serverless function
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND = os.path.join(ROOT, "backend")
if BACKEND not in sys.path:
    sys.path.insert(0, BACKEND)

from server import app  # noqa: E402,F401  (Vercel discovers `app`)
