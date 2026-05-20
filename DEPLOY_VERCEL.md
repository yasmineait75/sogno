# Déploiement Vercel — Sogno

Configuration **monorepo** : frontend React (`/frontend`) + backend FastAPI (`/backend`)
exposé en serverless Python via `/api/index.py`.

## 1. Pré-requis avant deploy

### MongoDB Atlas (obligatoire)
Le Mongo local ne sera pas accessible depuis Vercel. Créez un cluster gratuit
sur https://www.mongodb.com/cloud/atlas, ajoutez `0.0.0.0/0` à la whitelist IP
(temporaire) et récupérez l'URI :

```
mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

### Resend (optionnel — emails de confirmation)
Créez une clé sur https://resend.com → API Keys. Vérifiez aussi le domaine
`sogno-paris.fr` (ajout de DNS records chez votre registrar) pour pouvoir
envoyer depuis `noreply@sogno-paris.fr`.

## 2. Variables d'environnement Vercel

Dans **Project Settings → Environment Variables** (Production + Preview) :

| Clé | Valeur | Requis |
|---|---|---|
| `MONGO_URL` | `mongodb+srv://...` (Atlas) | ✅ |
| `DB_NAME` | `sogno` (ou ce que vous voulez) | ✅ |
| `CORS_ORIGINS` | `*` ou `https://sogno-paris.fr,https://www.sogno-paris.fr` | ✅ |
| `RESEND_API_KEY` | `re_xxx` | optionnel |
| `RESEND_FROM` | `Sogno Paris <noreply@sogno-paris.fr>` | optionnel |
| `REACT_APP_BACKEND_URL` | *(laisser vide — same-origin)* | ✅ (vide) |

⚠️ `REACT_APP_BACKEND_URL` doit être **défini mais vide** : les appels frontend
deviendront `/api/...` (same-origin) au lieu de `https://.../api/...`.

## 3. Étapes côté Vercel

1. Importez le repo GitHub `yasmineait75/sogno` sur https://vercel.com/new
2. **Framework Preset** : *Other* (laisser Vercel détecter via `vercel.json`)
3. **Root directory** : `./` (racine du repo, ne pas changer)
4. **Build/Output** : remplis automatiquement depuis `vercel.json`
5. Ajoutez les variables d'environnement ci-dessus
6. Cliquez **Deploy**

## 4. Comment ça fonctionne

- `vercel.json` :
  - Build le frontend CRA (`cd frontend && yarn install && yarn build`)
  - Output statique servi depuis `frontend/build`
  - Toute requête `/api/*` est rewrite vers `/api/index` (serverless Python)
- `/api/index.py` : importe le `app` FastAPI depuis `/backend/server.py`
- `/api/requirements.txt` : déps Python utilisées par la function
- `.vercelignore` : exclut `tests`, `node_modules`, `__pycache__`, etc.

## 5. Limites à connaître

- **Cold start** ~1-2 s à la première requête après inactivité.
- **maxDuration** = 30 s par requête (Hobby plan = 10 s, Pro = 60 s — réglé à 30 dans `vercel.json`).
- Pas de stockage local persistant côté Vercel (uploads → S3/Cloudinary nécessaire si ajoutés un jour).

## 6. Vérification post-déploiement

```bash
# Remplacez par votre URL Vercel
curl https://sogno.vercel.app/api/restaurant/sogno
# → doit renvoyer le JSON Sogno (name, address, hours, ...)

curl -X POST https://sogno.vercel.app/api/reservations \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@t.fr","phone":"0612345678",
       "date":"2026-09-01","time":"20:00","guests":2}'
# → HTTP 200 + JSON de la réservation persistée
```

## 7. Domaine personnalisé

Dans Vercel → Project → Settings → Domains : ajoutez `sogno-paris.fr`.
Vercel vous donnera 2 records DNS (A + CNAME) à ajouter chez votre registrar.
