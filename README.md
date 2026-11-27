# Random Quotes

A Next.js app where logged-in users can browse, like, create, edit and delete quotes. Quotes are stored in MongoDB and authentication is handled by Auth0.

## Run locally

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values
3. Insert the initial quotes into the database (only once): `npm run seed`
4. Start the app: `npm run dev` and open http://localhost:3000

## Notes

- The Auth0 callback URL is configured for `http://localhost:3000`, so the app has to run on port 3000.
- Only the user who created a quote can edit or delete it. The initial (seeded) quotes have no owner.