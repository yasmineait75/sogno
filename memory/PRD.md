# PRD — Multi-Restaurant Showcase (Breizh + Sogno)

## Original Problem Statement
> Site vitrine pour le restaurant Le Jean Michel Breizh (crêperie bretonne)
> + ajout d'un second restaurant Sogno (italien chic) sur URL séparée

## Architecture
- **Frontend**: React Router v6
  - `/` → Le Jean Michel Breizh (light cream/navy/cider, Cormorant Garamond)
  - `/sogno` → Sogno Paris (Portofino editorial, Bodoni Moda + Manrope, deep Mediterranean blue + lemon yellow accents)
- **Backend**: FastAPI + MongoDB partagé, champ `restaurant: "breizh" | "sogno"` sur reservations/contacts
- **Routes**:
  - `GET /api/restaurant` (Breizh info)
  - `GET /api/restaurant/sogno` (Sogno info)
  - `POST/GET /api/reservations` (filtré côté frontend)
  - `POST/GET /api/contact`

## Sogno — Identité finale
- **Hero**: vue aérienne golden hour Portofino + terrasse dressée premier plan, titre "SOGNO Paris.", tagline italique "Par magie culinaire, voyagez du 16e à Portofino."
- **Storia**: histoire authentique Thomas (fondateur, Pouilles, nonna) + Chef Dario, plat signature Uovo alla Valtellina, citation "Chaque repas est un voyage, et chaque assiette un souvenir."
- **Menu**: 27 plats authentiques avec noms italiens + traduction française en italique + descriptions copywritées (Instagram-sourced)
  - 8 Antipasti (Burrata, Vitello, Frittura, 2× Uovo, Prosciutto, Salumi, Gamberi)
  - 6 Primi (Orecchiette, Mafalde, Linguine, 2× Lasagne, Sedanini)
  - 4 Secondi (Pesce, Suprema tartufo, Ossobuco, Giardino)
  - 6 Dolci (Tiramisù, 2× Panna cotta, Passione, Pera, Cannolo)
  - 8 Cantina (Barolo, Brunello, Chianti, etc.)
- **Galleria**: 5 photos AI dans le style Instagram Sogno (assiettes noires mates, éclairage tamisé bistrot chic) — Burrata, Linguine, Tiramisù, Vitello, Suprema
- **Réservation**: calendrier (dimanche fermé), créneaux 12h-14h / 19h-22h, jusqu'à 8 couverts
- **Contact**: formulaire séparé, stocké en base avec restaurant=sogno

## Personas Sogno
- **CSP++ Trocadéro / 16e** : couple cherchant table chic le soir, mariage/anniversaire
- **Expatriés italiens** : nostalgie cuisine authentique régions Italie
- **Foodies Paris** : recommandé par bouche-à-oreille, public Instagram

## Implémenté (2026-05-18, itérations 1→7)
- ✅ Site Breizh complet (hero, about, menu, galerie, réservation+contact, footer)
- ✅ Site Sogno avec 7 itérations design (dark luxe → Portofino → Riviera Chic → restaurant Paris → magie culinaire)
- ✅ Routing multi-restaurants partageant le backend
- ✅ Backend partagé avec champ restaurant validé (pattern breizh|sogno)
- ✅ Tests E2E backend (15/15) + frontend validés (3 itérations testing_agent)
- ✅ Menu Sogno enrichi avec contenu Instagram authentique (chef Dario, Uovo alla Valtellina signature)
- ✅ Galerie remplacée par photos AI style assiettes noires (cohérence Instagram)

## Backlog
**P1**
- [ ] Photos réelles du chef Dario + Thomas (uploadées par client)
- [ ] Email de confirmation de réservation (Resend) — high impact anti-no-show
- [ ] Dashboard admin léger pour visualiser/valider les réservations par restaurant
- [ ] SEO meta tags par restaurant (og:image, description)

**P2**
- [ ] Internationalisation FR/EN/IT (clientèle internationale 16e)
- [ ] Galerie Instagram embedded (auto-feed @sogno_paris)
- [ ] Page presse + avis Google embed
- [ ] Capacité réelle 36 couverts avec blocage des créneaux pleins
