# Movies Website

Project duoc khoi tao theo yeu cau giai doan 1 va 2 voi cau truc tach rieng:

- `backend`: Express + TypeScript + MongoDB (Mongoose) + JWT auth
- `frontend`: Next.js (App Router) + Tailwind + Redux + React Query

## Setup nhanh

1. Backend:
   - Copy `backend/.env.example` thanh `backend/.env`
   - Dien `MONGODB_URI` va `JWT_SECRET`
2. Frontend:
   - Copy `frontend/.env.example` thanh `frontend/.env.local`

## Chay project

Mo 2 terminal:

- Backend: `cd backend && npm install && npm run dev`
- Frontend: `cd frontend && npm install && npm run dev`

## Da hoan thanh trong giai doan 1-2

- Khung FE/BE + TypeScript
- TailwindCSS (FE)
- Redux global state + React Query provider (FE)
- Model co ban: `User`, `Movie`, `Review` (BE)
- API auth: register/login/me (BE)
- Ma hoa mat khau bang bcrypt (BE)
- Middleware bao ve route admin:
  - BE: `/api/admin/dashboard` can token + role admin
  - FE: route `/admin` redirect ve `/login` neu chua co token cookie
- UI form dang nhap/dang ky voi React Hook Form + Zod
- Custom hook `useAuth` + luu token vao cookie/localStorage
- Prettier + Husky pre-commit (monorepo root)
