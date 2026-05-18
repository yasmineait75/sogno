# PRD — Le Jean Michel Breizh

## Original Problem Statement
> crée le site web pour ce restaurant https://www.google.com/maps/place/Le+Jean+Michel+Breizh/
> (Crêperie / bistrot breton — 7 rue Gros, 75016 Paris)

## User Choices (initial)
- Style: laissé à l'agent → **Refined Breton Bistro** (élégant, Archetype "Organic & Earthy", thème light)
- Fonctionnalités: vitrine + formulaire de réservation + formulaire de contact + bouton "Réserver"
- Menu: inventé (galettes, crêpes, cidres bretons)
- Intégrations externes: aucune (stockage en base uniquement, pas d'emailing)

## Personas
- **Anne, 38 ans, 16ᵉ Paris** — cherche une crêperie haut de gamme pour un dîner en famille
- **Pierre & Sophie, 45 ans, expatriés bretons** — nostalgie du pays, veulent du sarrasin authentique
- **Touristes francophones** — recherchent une expérience bretonne typique à Paris

## Architecture
- **Backend**: FastAPI + MongoDB (Motor). Routes sous `/api`:
  - `GET /api/restaurant` — infos publiques
  - `POST /api/reservations` + `GET /api/reservations` — réservations
  - `POST /api/contact` + `GET /api/contact` — messages
- **Frontend**: React 19, Tailwind, shadcn/ui, framer-motion, Lenis smooth scroll
  - Single-page : Hero → About (bento) → Menu (galettes/crêpes/cidres) → Gallery → Reservation+Contact → Footer
- **Typo**: Cormorant Garamond (display), Manrope (body), Outfit (accents)
- **Couleurs**: cream `#F9F6F0`, ocean navy `#1B2A47`, cider amber `#C27A3E`, granite `#1D2125`

## Implemented (2026-05-18)
- ✅ Backend: 4 routes + validation Pydantic (email, longueurs, ranges)
- ✅ Frontend: 6 sections complètes, design éditorial sur-mesure
- ✅ Formulaire de réservation (Calendar shadcn, lundi/dim désactivés, Select horaires & convives)
- ✅ Formulaire de contact + toasts Sonner
- ✅ Smooth scroll Lenis + animations framer-motion staggered
- ✅ Tests : 8/8 backend + 100% flows frontend OK

## Backlog
**P1**
- [ ] Validation backend de la date (future + créneau dans les heures d'ouverture)
- [ ] Rate-limiting / captcha léger sur POST publics
- [ ] Dashboard admin pour visualiser réservations / messages
- [ ] Envoi email de confirmation (Resend) optionnel

**P2**
- [ ] i18n (FR/EN) pour la clientèle internationale du 16ᵉ
- [ ] Gestion de capacité réelle (32 couverts, blocage si plein sur un créneau)
- [ ] Galerie dynamique avec upload image admin
- [ ] Page presse / avis clients
