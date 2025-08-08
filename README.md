# MyBank

Gestion et classification de dépenses bancaires.

Backend: Symfony + API Platform + JWT (Lexik)
Frontend: React + Vite + Atomic Design + Redux Toolkit
Infra: Docker (frontend, backend, MySQL, phpMyAdmin)


## Architecture
- `backend/`: API Symfony (API Platform, JWT, Doctrine)
- `frontend/`: App React (Vite, Tailwind, Atomic Design)
- Base de données: MySQL
- Outils: phpMyAdmin (optionnel)


## Prérequis
- Docker Desktop installé et en cours d’exécution
- Ports disponibles: Frontend `3000`, Backend `8000`


## Variables d’environnement
Frontend lit `VITE_API_URL` pour l’URL de l’API.

Exemple recommandé (pointant vers le backend en local):
```
VITE_API_URL=http://localhost:8000
```

Selon votre setup, placez cette variable dans `frontend/.env` (ou `.env.local`).


## Démarrage rapide (Docker)
Dans le répertoire racine `MyBank/`:

1) Construire et lancer en détaché
```
docker compose up --build -d
```

2) Attendre quelques secondes que les conteneurs soient prêts, puis ouvrir:
- Frontend: http://localhost:3000/
- Backend API: http://localhost:8000/

3) Arrêter et nettoyer
```
docker compose down
```


## Première utilisation et tests
1) Inscription et connexion
- Allez sur le Frontend http://localhost:3000/
- Créez un compte via la page Inscription, puis connectez-vous

2) Tableau de bord et opérations
- Accédez au Dashboard pour voir vos opérations (par utilisateur)

3) Catégories
- Page Catégories (route protégée: nécessite d’être connecté)
- Création de catégorie (POST `/api/categories`) — le backend assigne automatiquement l’utilisateur via un DataProcessor

4) Routes protégées (Frontend)
- L’accès aux pages privées redirige vers `/login` si non authentifié
- Après login, l’état d’authentification est restauré au rechargement (token stocké côté client)


## Commandes utiles
- Lancer/mettre à jour:
```
docker compose up --build -d
```

- Voir les logs (exemples):
```
docker compose logs -f backend
docker compose logs -f frontend
```

- Arrêter et supprimer:
```
docker compose down
```


## Développement
- Frontend
  - Base URL API via `VITE_API_URL`
  - Intercepteur Axios ajoute automatiquement `Authorization: Bearer <token>` si présent en localStorage
  - Design system (atoms/molecules/organisms), boutons avec variants/sizes
- Backend
  - API Platform expose les entités `Operation`, `Category` (filtrées par utilisateur authentifié via DataProviders)
  - `CategoryDataProcessor` assigne l’utilisateur connecté lors du POST
  - JWT (Lexik) pour l’authentification


## Dépannage (FAQ)
- 401 sur une route protégée (ex: POST `/api/categories`)
  - Vérifiez que vous êtes connecté et que le token est bien en localStorage
  - Le header `Authorization: Bearer <token>` doit être présent (géré par Axios)

- 415 Unsupported Media Type
  - Le frontend envoie `Content-Type: application/json` par défaut; assurez-vous d’utiliser l’instance Axios du projet

- Redirection non désirée vers /login après refresh
  - Le frontend hydrate l’état auth depuis `localStorage`; un bref état "Chargement..." peut s’afficher avant l’accès

- Conflit de ports
  - Assurez-vous que `3000` (frontend) et `8000` (backend) sont libres

- Scripts shell dans Docker qui ne s’exécutent pas sous Windows
  - Assurez-vous que les scripts ont des fins de lignes `LF` (pas `CRLF`) et les permissions d’exécution


## Sécurité et filtrage
- Les collections (opérations, catégories) sont filtrées côté backend pour ne retourner que les ressources de l’utilisateur authentifié
- Les routes frontend sensibles sont protégées et nécessitent une session valide


## Licence
Projet pédagogique. Utilisation libre pour apprentissage.
