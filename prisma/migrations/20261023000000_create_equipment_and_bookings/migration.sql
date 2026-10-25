CREATE TYPE "equipment_status" AS ENUM ('AVAILABLE', 'ON_SITE', 'MAINTENANCE');

CREATE TYPE "booking_status" AS ENUM (
  'PENDING_APPROVAL',
  'AWAITING_PAYMENT',
  'PAID_IN_ESCROW',
  'COMPLETED'
);

CREATE TABLE "equipment" (
  "id" TEXT NOT NULL,
  "owner_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "hourly_rate" DECIMAL(12,2) NOT NULL,
  "base_delivery_fee" DECIMAL(12,2) NOT NULL DEFAULT 3500.00,
  "rate_per_km" DECIMAL(12,2) NOT NULL DEFAULT 70.00,
  "status" "equipment_status" NOT NULL DEFAULT 'AVAILABLE',
  "next_available_date" TIMESTAMPTZ(3),

  CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "bookings" (
  "id" TEXT NOT NULL,
  "equipment_id" TEXT NOT NULL,
  "renter_id" TEXT NOT NULL,
  "rental_hours" INTEGER NOT NULL,
  "distance_km" DECIMAL(10,3) NOT NULL,
  "rental_cost" DECIMAL(12,2) NOT NULL,
  "base_delivery_fee" DECIMAL(12,2) NOT NULL,
  "travel_charge" DECIMAL(12,2) NOT NULL,
  "gross_total" DECIMAL(12,2) NOT NULL,
  "platform_fee_retained" DECIMAL(12,2) NOT NULL,
  "owner_net_payout" DECIMAL(12,2) NOT NULL,
  "booking_status" "booking_status" NOT NULL DEFAULT 'PENDING_APPROVAL',
  "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(3) NOT NULL,

  CONSTRAINT "bookings_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "bookings_equipment_id_fkey"
    FOREIGN KEY ("equipment_id") REFERENCES "equipment"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "equipment_owner_id_idx" ON "equipment"("owner_id");
CREATE INDEX "bookings_equipment_id_booking_status_idx" ON "bookings"("equipment_id", "booking_status");
CREATE INDEX "bookings_renter_id_idx" ON "bookings"("renter_id");
