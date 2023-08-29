-- AlterTable
ALTER TABLE "Generation" ADD COLUMN     "structure" TEXT,
ADD COLUMN     "webhookToken" TEXT;

-- AlterTable
ALTER TABLE "OutputImage" ALTER COLUMN "scenarioImageId" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "seed" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Generation_inferenceId_webhookToken_idx" ON "Generation"("inferenceId", "webhookToken");
