ALTER TABLE "bookings"
  ADD COLUMN "start_date" DATE,
  ADD COLUMN "end_date" DATE,
  ADD COLUMN "payment_checkout_session_id" TEXT,
  ADD COLUMN "payment_checkout_url" TEXT,
  ADD COLUMN "payment_id" TEXT,
  ADD COLUMN "paid_at" TIMESTAMPTZ(3);

CREATE UNIQUE INDEX "bookings_payment_checkout_session_id_key"
  ON "bookings"("payment_checkout_session_id");

CREATE INDEX "bookings_booking_status_paid_at_idx"
  ON "bookings"("booking_status", "paid_at");
