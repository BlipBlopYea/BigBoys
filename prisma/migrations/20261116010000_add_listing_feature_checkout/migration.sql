ALTER TABLE "equipment"
ADD COLUMN "is_featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "boost_region" TEXT,
ADD COLUMN "feature_expires_at" TIMESTAMPTZ(3),
ADD COLUMN "feature_checkout_session_id" TEXT,
ADD COLUMN "feature_checkout_url" TEXT,
ADD COLUMN "feature_last_paid_session_id" TEXT;

CREATE UNIQUE INDEX "equipment_feature_checkout_session_id_key"
ON "equipment"("feature_checkout_session_id");

CREATE UNIQUE INDEX "equipment_feature_last_paid_session_id_key"
ON "equipment"("feature_last_paid_session_id");

UPDATE "equipment"
SET "is_featured" = true, "boost_region" = 'Davao Region'
WHERE "name" IN ('Komatsu PC200 Excavator', 'CAT 320D Hydraulic Excavator');
