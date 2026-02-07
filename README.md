# Ecommerce

## Setup

1. Copy `.env.example` to `.env` and update values.
2. Run `docker compose up --build`.
3. In a new terminal, run `cd backend` then `npm install`.
4. Run `npx prisma migrate dev --schema ../prisma/schema.prisma`.
5. Run `npx prisma generate --schema ../prisma/schema.prisma`.
6. Run `npx ts-node ../prisma/seed.ts`.
7. Open `http://localhost:3000`.
