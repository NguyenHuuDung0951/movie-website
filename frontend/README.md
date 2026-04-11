# Frontend

Next.js App Router + TypeScript frontend for Movies Website.

## Run

1. Install dependencies from workspace root.
2. Make sure backend is running at http://localhost:4000.
3. Create .env from .env.example.
4. Start frontend:

```bash
npm run dev --workspace frontend
```

## Environment

Required variable in frontend/.env:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## Main Folders

- src/app: Next.js routes and layout
- src/components: UI and app-level components
- src/features: feature-specific types and API helpers
- src/hooks: custom hooks
- src/lib: shared clients and utilities
- src/store: Redux store and slices

## Validation

```bash
npm run lint --workspace frontend
```
