# Movies Website Monorepo

Workspace includes:

- backend: Express + TypeScript + MongoDB
- frontend: React + Vite + TypeScript

## Requirements

- Node.js 20+
- MongoDB local or MongoDB Atlas

## Setup

1. Install dependencies in workspace root:

```bash
npm install
```

2. Configure backend environment in backend/.env:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/movies_website
JWT_SECRET=your_jwt_secret_here
```

3. Configure frontend environment in frontend/.env:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## Run

Start backend:

```bash
npm run dev:backend
```

Start frontend:

```bash
npm run dev:frontend
```

## Lint

Run all checks:

```bash
npm run lint
```

## Current API

- GET /health
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/admin/dashboard
- GET /api/movies
- GET /api/movies/home
