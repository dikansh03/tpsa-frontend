# TPSA Frontend

React + TypeScript + Vite frontend foundation based on the supplied Titan Pro Sports Academy Figma screenshots.

## Run locally

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173  
Backend API base: http://localhost:8080 (configured in `.env.development`).

## Build and lint

```bash
npm run build
npm run lint
```

## Current implementation

- Figma-inspired admin shell, responsive sidebar and navigation
- Login integration with `POST /auth/login`, refresh, logout and `/users/me`
- Dashboard visual with sample data (dashboard aggregation endpoints are not present in the supplied backend ZIP)
- Registrations and CRM visual previews with sample data (player/guardian/enrolment and CRM APIs are not present in the supplied backend ZIP)
- Centres screen connected to `GET /centres` and `POST /centres`
- Public landing page design preview at `/website`
- Development-only screen preview routes under `/preview/*`

## Backend contract currently used

- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /users/me`
- `GET /centres`
- `POST /centres`

The app reads `VITE_API_BASE_URL` from the Vite environment. Backend CORS must allow `http://localhost:5173`.

## Backend issues to resolve before end-to-end use

1. The uploaded backend ZIP contains unresolved Git conflict markers in `AppUserRepository.java` around `findPermissionCodes` and `existsByEmail`. This is an observation about the supplied archive only; this frontend package does not modify backend code.
2. The supplied `SecurityConfig` defines a custom `JwtAuthenticationConverter` for the `permissions` claim but configures the resource server with `jwt(Customizer.withDefaults())`; wire the converter explicitly before relying on permission-protected endpoints.
3. `BootstrapAdminRunner` creates the user without assigning the seeded `SYSTEM_ADMIN` role. The V3 migration associates users who exist at migration time, but Flyway runs before the `CommandLineRunner`. Assign the role during bootstrap or add a safe reconciliation migration/runner.
4. The supplied backend exposes centre CRUD, but no player, guardian, enrolment, CRM, dashboard, batch, venue, sport, age-group or skill-level CRUD controllers were found in the archive. The corresponding frontend areas are visual previews/placeholders until those contracts exist.

## Authentication storage note

The current backend returns the refresh token in the JSON response. For local development this frontend stores it in `sessionStorage` and keeps the access token in memory. Before production, change the backend to issue the refresh token as a Secure, HttpOnly, SameSite cookie and update the frontend refresh flow accordingly. Browser storage is accessible to JavaScript and is not an ideal production location for long-lived credentials.

## Design fidelity

Colors, sizing and layouts were approximated from the supplied full-screen Figma screenshots. Exact design tokens (fonts, spacing, component variants) should be taken from Figma Inspect/Dev Mode when accessible.
