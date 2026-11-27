# Random Quotes

A Next.js app to browse, like, create, edit and delete quotes. Quotes are stored in MongoDB and authentication is handled by Auth0.

## Features

- Browse quotes: random start, previous / next, a "Random quote" button and a category filter
- Log in or sign up with Auth0
- Like and unlike quotes (stored per user)
- Add your own quotes (with client- and server-side validation)
- "My quotes" page where you can edit and delete the quotes you created. Only the creator of a quote can edit or delete it
- "Liked quotes" page
- Copy a quote to the clipboard
- Light and dark theme, responsive layout

## Tech stack

Next.js (App Router, Server Actions), TypeScript, Tailwind CSS, shadcn/ui, React Hook Form and Zod, MongoDB (Atlas), Auth0.

## Run locally

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values (shared with the instructor in Classroom)
3. Insert the initial quotes into the database (only needed for an empty database): `npm run seed`
4. Start the app: `npm run dev` and open http://localhost:3000

## Notes

- The Auth0 callback URL is configured for `http://localhost:3000`, so the app has to run on port 3000.
- The 50 initial quotes have no owner, so nobody can edit or delete them.
- Test accounts are provided in the Classroom submission.