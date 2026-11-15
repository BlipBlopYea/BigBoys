# Big Boys Rental API

The original workspace is a static marketplace prototype. The booking API uses Node.js, Express, Prisma, and PostgreSQL.

## Mockup-only testing

Open `index.html` directly to test the marketplace without Node.js or a database. The mock equipment list supports booking requests, owner approval, and an offline simulator that marks a booking `PAID_IN_ESCROW` without processing a payment. To use the actual PayMongo Sandbox with mock equipment, set `PAYMONGO_SECRET_KEY` in the ignored `.env`, start the API with `npm start`, and open `http://localhost:3000`. The mock checkout API validates prices against the server-side demo catalog and creates a real PayMongo Checkout Session without requiring PostgreSQL. Mock bookings are saved in browser local storage so the app can verify payment after PayMongo redirects back; the API must remain running during checkout. This development-only mock checkout endpoint is disabled in production. Never commit `.env`.

If PostgreSQL is unreachable, API database calls automatically switch to a process-local memory store seeded with the demo equipment and sample bookings. Booking, approval, payment, and listing-boost state then work until the server restarts. Local-only owner listings are kept in the same memory store for checkout even when PostgreSQL is available, while their browser copy and confirmed payment/feature status are persisted in local storage. PayMongo Sandbox checkout remains live and still requires `PAYMONGO_SECRET_KEY`; no card or bank credentials are stored by the app.

## Setup

1. If `.env` does not exist, copy `.env.example` to `.env`. Set `DATABASE_URL`, `APP_URL`, `PAYMONGO_SECRET_KEY`, `PAYMONGO_WEBHOOK_SECRET`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` in `.env` (never put credentials in `.env.example`). `ADMIN_EMAIL` defaults to `admin@bigboys.com`; use a unique password for `ADMIN_PASSWORD` and a random value of at least 32 characters for `ADMIN_SESSION_SECRET`.
2. Install dependencies with `npm install`.
3. Generate the Prisma client with `npm run db:generate`.
4. Apply the migration with `npm run db:migrate`.
5. Populate the demo inventory with `npm run db:seed`.
6. Start the API with `npm start` (defaults to port `3000`).
7. Open `http://localhost:3000` to use the UI from the same origin as the API.

`npm run db:migrate:dev` applies migrations during local development.

## Booking API

- `GET /api/equipment` returns equipment IDs and current logistics rates for the catalog.
- `GET /api/bookings?renterId=...` or `GET /api/bookings?ownerId=...` returns persisted bookings for the corresponding account.
- `POST /api/bookings` accepts `{"equipmentId":"equipment-id","renterId":"renter-id","rentalHours":8,"distanceKm":12.5,"startDate":"2026-11-02","endDate":"2026-11-02"}`, calculates and snapshots the financial breakdown, and creates a `PENDING_APPROVAL` booking. The date fields are optional but must be supplied together when used.
- `PATCH /api/bookings/:bookingId/approve` accepts `{"ownerId":"equipment-owner-id"}`, verifies the owner matches the equipment, and changes a pending booking to `AWAITING_PAYMENT`.
- `PATCH /api/bookings/:bookingId/decline` accepts `{"ownerId":"equipment-owner-id"}`, verifies the owner matches the equipment, and changes a pending booking to `DECLINED`.

`calculateBookingFinancials` in `src/booking-financials.js` calculates rental cost, round-trip travel, gross total, platform fee, and owner payout. All monetary results are rounded to cents.

## PayMongo Sandbox

- Use a PayMongo **test** secret key beginning with `sk_test_`; live keys are rejected by the checkout integration.
- Checkout Sessions are created and retrieved with PayMongo's `/v1/checkout_sessions` API.
- Configure the PayMongo webhook URL as `https://<your-public-host>/api/payments/paymongo/webhook` and subscribe to `checkout_session.payment.paid`. Set the endpoint's signing secret as `PAYMONGO_WEBHOOK_SECRET`.
- `POST /api/create-checkout-session` creates (or reuses) a PayMongo Checkout Session for an approved database booking (`{"bookingId":"..."}`) or a demo/local listing (`{"mock":true,"bookingId":"...","equipmentId":1,"rentalHours":8,"distanceKm":12.5,"equipmentName":"Local Excavator","hourlyRate":999,"baseDeliveryFee":1500,"ratePerKm":45}`). Known demo IDs are priced from the server catalog; local-only mock listings supply their own item details. The route returns `checkout_url` and redirects to `http://localhost:3000` after checkout by default.
- `POST /api/bookings/:bookingId/checkout-session` remains available as the database-booking-specific checkout route.
- `GET /api/bookings/:bookingId/checkout-details` returns the status and itemized totals used by the checkout UI.
- `POST /api/equipment/:equipmentId/feature-checkout-session` creates or reuses the owner’s PayMongo Checkout Session for a ₱299, 30-day Davao Region listing boost. A verified payment activates the featured status; `GET /api/equipment/:equipmentId/feature-status?ownerId=...` verifies the Checkout Session after PayMongo redirects back.
- `POST /api/auth/admin/login` verifies the configured admin email and password and sets an eight-hour, HttpOnly, SameSite=Strict signed session cookie. `POST /api/auth/admin/logout` clears it.
- `GET /api/admin/transactions` returns paid escrow ledger rows only to a valid admin session.
- The webhook verifies the PayMongo signature and timestamp, retrieves the Checkout Session from PayMongo, checks that its paid amount matches the booking, then atomically marks the booking `PAID_IN_ESCROW` and equipment `ON_SITE`.
- A verified ₱299 listing-boost payment sets `isFeatured`, `boostRegion`, and a 30-day `featureExpiresAt` on the equipment record. Expired boosts no longer appear as featured.
- `POST /api/bookings/:bookingId/simulate-payment` is a development-only shortcut. It is disabled when `NODE_ENV=production`.

The owner and renter IDs in the current prototype are not authenticated identities. Checkout is created automatically for the selected database booking; serve the page from this API and complete database setup for the request → approval → checkout flow. When the UI is served by this API, the admin ledger loads paid escrow records from the database; opening the static prototype directly displays only in-memory demo records, and admin sign-in requires the API.

## Authentication note

This repository has no authentication provider or user tables. Admin ledger access is protected by the server-side configured admin password and signed session cookie. The owner/renter IDs accepted by other prototype endpoints are identifiers, not proof of identity. Put the API behind authenticated middleware and derive those IDs from the authenticated principal before using it for real bookings or approvals.
