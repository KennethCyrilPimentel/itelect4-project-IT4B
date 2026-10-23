# Shoot Tracker (itelect4-project)

Frontend for **Shoot Tracker**, a photography booking app: request a shoot, track its status, and see the deliverables (photo batches) for each shoot. Built with React, TypeScript and Vite, and connected to a real API.

## Live links

- **Live frontend:** https://itelect4-project-it-4-b-mu.vercel.app
- **Live backend (API):** https://itelect4-backend-eta.vercel.app
- **Backend repo:** https://github.com/KennethCyrilPimentel/itelect4-backend

## Features

- Register and log in with a real account (JWT token from the backend)
- Request a shoot with a validated form (React Hook Form + Zod) and see only your own shoots
- Shoot detail page and a deliverables page
- Protected routes: shoots and deliverables need a login
- Dark mode

## Built with

React, TypeScript, Vite, React Router, TanStack Query, Zustand, React Hook Form, Zod, Tailwind CSS and shadcn/ui.

## Run it locally

```
npm install
npm run dev
```

Create a `.env.local` file in the project root with:

```
VITE_API_URL=https://itelect4-backend-eta.vercel.app/api
```

The app runs on http://localhost:5173. To build for production, run `npm run build`.

## Deployment

Deployed on Vercel. `VITE_API_URL` is set as an environment variable there, and `vercel.json` sends every path to `index.html` so refreshing on a page like `/shoots` works.
