-- CreateEnum
CREATE TYPE "PLATFORM" AS ENUM ('SCENARIO', 'REPLICATE');

-- AlterTable
ALTER TABLE "Generation" ADD COLUMN     "completed_at" TIMESTAMP(3),
ADD COLUMN     "error" TEXT,
ADD COLUMN     "input" JSONB,
ADD COLUMN     "logs" TEXT,
ADD COLUMN     "metrics" JSONB,
ADD COLUMN     "output" JSONB,
ADD COLUMN     "platform" TEXT NOT NULL DEFAULT 'SCENARIO',
ADD COLUMN     "version" TEXT;

-- CreateIndex
CREATE INDEX "Generation_platform_idx" ON "Generation"("platform");
