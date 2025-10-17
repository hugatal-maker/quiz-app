# Quiz App

Interactive statistics quiz trainer that helps students prepare for exams with quick feedback, progress tracking, and a streamlined study flow.

## Project Structure

- `public/` – Static assets served in development and deployed to production.
  - `index.html` – Application shell with welcome, quiz, and results screens.
  - `styles/main.css` – Tailored styling inspired by the provided POC.
  - `scripts/main.js` – UI controller and quiz logic.
  - `scripts/question-bank.js` – Question data and difficulty metadata.
- `scripts/` – Node-based tooling for local development and build automation.
  - `dev-server.js` – Lightweight static server for the `public` directory.
  - `build.js` – Copies the latest assets into the `dist` folder.
  - `preview.js` – Static server for the production-ready `dist` output.
- `dist/` – Generated at build time; contents are safe to deploy.

## Prerequisites

- [Node.js](https://nodejs.org/) v16 or newer (to run the tooling scripts).

There are no runtime dependencies, so the default `npm install` step is optional.

## Development Workflow

```bash
# Serve the app locally at http://localhost:5173
npm run dev
```

`dev-server.js` serves everything from the `public` directory. When you change files, refresh the browser to see the updates.

## Building for Deployment

```bash
npm run build
```
```
powershell.exe -Command '& '"'"'C:\Program Files\nodejs\node.exe'"'"' scripts/dev-server.js'
```

This command copies the current `public` directory into `dist/`. Deploy the contents of `dist/` to any static host (Netlify, GitHub Pages, cloud storage buckets, etc.).

To verify the production bundle locally:

```bash
npm run preview
```

The preview server serves files from `dist/` on http://localhost:4173.

## Alternative Without Node.js

If Node.js is unavailable you can still work with the project:

1. Open `public/index.html` directly in the browser for a quick check, or  
2. Run a static server from the `public` directory (for example `python -m http.server 8000`).

## Extending the Quiz

- Add new questions or update difficulty levels in `public/scripts/question-bank.js`.
- Adjust styling in `public/styles/main.css`.
- Enhance quiz behaviour (timers, categories, persistence, etc.) in `public/scripts/main.js`.

The current session uses eight questions chosen from the bank at random and provides a full summary when finished. Replace or skip questions mid-session using the provided controls to keep practice focused.
