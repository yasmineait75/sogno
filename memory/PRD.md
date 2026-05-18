# PRD — Sogno (Ristorante Italiano, Paris 16e)

## Original problem statement
Créer un site vitrine premium pour le restaurant italien **Sogno** (42 Rue de l'Amiral Hamelin, 75016 Paris). Esthétique chic moderne « Dolce Vita / Portofino Riviera × Paris Gastronomy ». Le site est utilisé en preview pour pitcher le restaurant — pas de déploiement.

## Personas
- Visiteur Parisien aisé / touriste haut de gamme cherchant un dîner italien.
- Le restaurateur (utilisateur de l'app) qui pitche la maquette.

## Core requirements
1. Site mono-restaurant Sogno servi sur la route racine `/`.
2. Sections : Hero, La Storia (Notre histoire), Menu (La carte), Galerie, Réservation, Contact, Footer.
3. UI en français, noms des plats en italien (authenticité).
4. Formulaire de réservation et de contact persistés en base (MongoDB).
5. Pas d'envoi d'emails pour l'instant (à activer après le pitch).

## Architecture
```
/app
├── backend/
│   ├── server.py            # FastAPI — endpoints /api/restaurant/sogno, /api/reservations, /api/contact
│   └── tests/test_api.py    # Pytest, 8 tests
└── frontend/src/
    ├── App.js               # Route unique `/` → SognoPage
    ├── pages/SognoPage.jsx
    ├── components/sogno/    # SognoNavbar, SognoHero, SognoStoria, SognoMenu, SognoGalleria, SognoReservation, SognoFooter
    ├── components/ui/       # Shadcn
    └── lib/sogno-data.js    # Données menu / infos
```

## API endpoints (tous préfixés /api)
- `GET /api/restaurant/sogno` — infos restaurant
- `POST /api/reservations` — création (restaurant verrouillé sur "sogno")
- `GET /api/reservations`
- `POST /api/contact`
- `GET /api/contact`

## Data models
- `Reservation { id, restaurant="sogno", name, email, phone, date, time, guests, notes, status, created_at }`
- `ContactMessage { id, restaurant="sogno", name, email, subject, message, created_at }`

## Changelog
- **2026-02 (initial)** : Sites Breizh + Sogno co-existant sur `/` et `/sogno`.
- **2026-02 (current)** : Suppression complète des fichiers Breizh. Le projet est désormais dédié uniquement à Sogno. `/` sert SognoPage. Backend nettoyé (route Breizh + champs « breizh » retirés ; restaurant fixé à "sogno"). Tests réécrits (8/8 passent).

## Roadmap
- **P1** — Remplacer les images IA du fondateur Thomas et du Chef Dario par de vraies photos.
- **P2** — Activer l'envoi d'emails de confirmation des réservations (Resend ou SendGrid) après pitch validé.
- **P2** — Page presse / événements privés / carte des vins détaillée.

## Health
- Build : OK
- Backend tests : 8/8
- Smoke test frontend : OK (sogno-page rendu sur `/`, pas de lien Breizh)
