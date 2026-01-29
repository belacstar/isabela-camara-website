# Isabela Camara Website

Portfolio/website para isabelacamara.com, feito com React + Vite.
Hosting: Firebase Hosting. Dados: Firestore.

## Requisitos
- Node 18+
- Firebase CLI (`npm install -g firebase-tools`)

## Setup
- `npm install`
- `cp .env.example .env.local` e preencher variaveis
- `npm run dev`

## Scripts
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run deploy`

## Firebase Hosting
- `firebase login`
- `firebase use isabela-camara-website`
- `npm run deploy`

## Firestore
- Colecao `site_metrics`, documento `visitor_total`
- Campo `value` para o contador de visitantes

## Variaveis de ambiente
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_SITE_URL` (opcional)
