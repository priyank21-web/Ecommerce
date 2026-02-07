# Ecommerce

## Setup

1. Copy `.env.example` to `.env` and update values.
2. Run `docker compose up --build`.
3. In a new terminal, run `cd backend` then `npm install`.
4. Run `npx prisma migrate dev --schema ../prisma/schema.prisma`.
5. Run `npx prisma generate --schema ../prisma/schema.prisma`.
6. Run `npx ts-node ../prisma/seed.ts`.
7. Open `http://localhost:3000`.

## Merge conflict options

- **Accept Current Change** keeps the version from your current branch (the file as it exists in your local changes).
- **Accept Incoming Change** keeps the version from the branch you are merging in.
- **Accept Both Changes** keeps both blocks and you must manually reconcile ordering and duplicates.
