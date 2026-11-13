# zad-alakherah-frontend — Agent Reference

Arabic (RTL) charity management dashboard for families, donors, donations, expenses, and budgets. Frontend only; talks to a .NET backend API.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run lint` — ESLint (has ~170 pre-existing errors; don't try to fix them all, just don't add new ones)
- `npm run preview` — preview built app

Run `npm run lint` after changes to verify nothing new broke.

## Stack

- React 19 + Vite 8, plain JavaScript/JSX (no TypeScript)
- Tailwind CSS v4 (via `@tailwindcss/vite`), shadcn-style components (`@base-ui/react`, `class-variance-authority`, `tailwind-merge`, `tw-animate-css`)
- React Router 7 (`react-router` + `react-router-dom`)
- TanStack Query 5 for all server state
- Formik + Yup for forms/validation
- axios for HTTP, react-hot-toast for notifications, lucide-react for icons

## Path Alias

`@` → `src/` (configured in `vite.config.js` and `jsconfig.json`). Always import with `@/...`:

```js
import client from "@/api/axiosGlobals";
```

## Architecture

Data flow: **service → hook → page**

- `src/services/<domain>/services.js` — plain async functions using the shared axios client; return `res.data`. e.g. `getAllDonersFn`, `addDonerFn`.
- `src/hooks/<domain>/use<X>.jsx` — TanStack Query wrappers. Queries return `{ data, isLoading, isError }`; mutations handle toasts (`onError` reads `error?.response?.data?.detail`) and return `{ mutate, isPending }`.
- `src/pages/<domain>/` — page components, one folder per feature.
- `src/constants/schemas/` — shared Yup schemas (`donerSchema`, `donationSchema`, `familySchema`, …). Put new validation there, not inline.
- `src/constants/` — per-domain static config/options (banks, donations, families, …).
- `src/appComponents/` — app-level composites (layout, header, models/Loading|Error|Empty, pagination, search, sidebar data).
- `src/components/ui/` — generic shadcn-style primitives (button, dialog, input, table, sidebar, …).
- `src/api/axiosGlobals.js` — shared axios client: `baseURL = import.meta.env.VITE_BASE_URL`, `withCredentials: true`, auto-refresh on 401 via `POST /Auth/refresh` (single-flight), logout clears `localStorage.zadUser` and redirects to `/login`.
- `src/contextAPI/UserProvider.jsx` — user context, reads `localStorage.zadUser`.
- `src/protectedRoute/` — `ProtectedRoute` (auth required), `InverseProtected` (logged-in users can't see login), `DashboardRoutes` wraps the authenticated `<Outlet/>`.
- `src/utlis/` (note the typo — it's `utlis`, not `utils`) — helpers: `buildFormData`, `buildPayload`, `formDataHelper`, `addDonationValidateFun`, `inputClass`.

## Routing

All routes are declared manually in `src/App.jsx`. Authenticated pages are children of `<Route path='/' element={<DashboardRoutes/>}>`. New page ⇒ import it and add a `<Route>` there.

## Conventions

- UI is Arabic and RTL: root `<div dir='rtl'>`. All user-facing strings, toast messages, and Yup error messages are in Arabic — keep them that way.
- Domain spelling is `doners`/`doner` throughout the codebase (files, routes `/doners`, functions, query keys). Keep it consistent; do not "correct" to `donors` in new code.
- Component files are `.jsx`, service/hook files are `.jsx`/`.js` matching neighbors — mirror the existing domain folder when adding a feature.
- Mutations must toast on success and failure (Arabic messages), pattern in `src/hooks/doners/useAddDoner.jsx`.
- Query keys follow `['<domain>', params]`.
- Forms use Formik + Yup schema from `src/constants/schemas`.
- New UI primitives belong in `src/components/ui/`; feature composites in `src/appComponents/`.

## Environment

- `.env` (gitignored): `VITE_BASE_URL`, `VITE_STITCH_API_KEY`
- `vercel.json` rewrites all paths to `/index.html` (SPA hosting).
- `opencode.json` and `.env` are gitignored — local only.

## Git

Commits are short, lowercase, imperative-ish messages describing the change, e.g. `edit cash required field in add family page`. Do not commit unless explicitly asked.
