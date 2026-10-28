# C&CA Hackathon Hub V1

A frontend-only React, TypeScript and Vite prototype. All users, events, projects and conversations are fictional. No backend, database, external API, authentication or cloud services. No passwords. Creator-only editing is a simulated UI rule, not a security boundary; real enforcement requires a future backend.

## Run

Requires Node.js 22.12+ (or 20.19+) and npm.

```sh
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite. Choose a sample user and click **Enter demo**, or create a local demo profile.

```sh
npm run build
npm run preview
npm run lint
```

The build includes strict TypeScript checking. The preview command serves the production build.

## Local demo

- Eight users, three hackathons and twelve projects are defined in `src/data.ts`.
- Shared area options and types live in `src/types.ts`.
- `src/storage.ts` validates and persists data under `cca-hackathon-hub-v1` in localStorage. Missing or malformed saved data falls back to the original samples. Unavailable storage displays a warning.
- Search, area and hackathon filters combine. My area and the dropdown share one filter state.
- The shared create/edit form validates required information, reuse routes and HTTP/HTTPS links.
- Likes are unique per user and project. Comments reject blank input. Counts update immediately.
- Changes and the selected profile survive refresh. Reset demo data restores all samples, removes locally created profiles/projects and signs out.

All seed contact addresses use `example.com`. Example repository links are illustrative, not genuine repositories. Fonts and icons are bundled locally. Do not enter sensitive, client or production information. Data is accessible to anyone using this browser profile; it is not synchronised across devices. Clearing browser storage removes demo changes.

## Verification

The TypeScript production build was verified. Browser access was skipped in this environment, so sign-in, filters/search, create/edit, likes/comments, switching users, refresh persistence and reset have not been browser-verified. To smoke-test, enter as Alex, toggle My area / All areas, search, publish and edit a project, like and comment, switch to Priya and confirm Edit is absent, refresh to check persistence, then reset and confirm twelve sample projects return.
