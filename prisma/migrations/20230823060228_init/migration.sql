-- CreateEnum
CREATE TYPE "GENERATIONSTATUS" AS ENUM ('PROCESSING', 'COMPLETE', 'FAILED', 'TIMEOUT');

-- CreateEnum
CREATE TYPE "GENERATIONSATISFCATION" AS ENUM ('NOOPINION', 'SATISFIED', 'UNSATISFIED');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referredByUserId" TEXT,
    "credits" INTEGER NOT NULL DEFAULT 0,
    "feedbackCreditsGranted" INTEGER NOT NULL DEFAULT 0,
    "creditsEarnedViaReferrals" INTEGER NOT NULL DEFAULT 0,
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_current_period_end" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Generation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "inferenceId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "image" TEXT,
    "mask" TEXT,
    "numInferenceSteps" INTEGER NOT NULL DEFAULT 50,
    "pixelSize" INTEGER NOT NULL DEFAULT 8,
    "modality" TEXT,
    "seed" TEXT,
    "strength" DOUBLE PRECISION,
    "negativePrompt" TEXT,
    "guidance" DOUBLE PRECISION DEFAULT 7.5,
    "numSamples" INTEGER NOT NULL DEFAULT 4,
    "width" INTEGER DEFAULT 512,
    "height" INTEGER DEFAULT 512,
    "type" TEXT DEFAULT 'txt2img',
    "favorites" INTEGER NOT NULL DEFAULT 0,
    "status" "GENERATIONSTATUS" NOT NULL DEFAULT 'PROCESSING',
    "colorPaletteEnabled" BOOLEAN NOT NULL DEFAULT false,
    "colors" JSONB,

    CONSTRAINT "Generation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenerationFeedback" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "satisfaction" "GENERATIONSATISFCATION" NOT NULL DEFAULT 'NOOPINION',
    "comment" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,

    CONSTRAINT "GenerationFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutputImage" (
    "id" TEXT NOT NULL,
    "scenarioImageId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,
    "pixelatedImage" TEXT NOT NULL,
    "upscaledImage" TEXT,
    "seed" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,

    CONSTRAINT "OutputImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "creditAmount" INTEGER NOT NULL,
    "stripe_current_period_end" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_customer_id_key" ON "users"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_subscription_id_key" ON "users"("stripe_subscription_id");

-- CreateIndex
CREATE INDEX "users_referredByUserId_idx" ON "users"("referredByUserId");

-- CreateIndex
CREATE INDEX "Generation_userId_idx" ON "Generation"("userId");

-- CreateIndex
CREATE INDEX "Generation_modelId_idx" ON "Generation"("modelId");

-- CreateIndex
CREATE UNIQUE INDEX "Generation_inferenceId_modelId_key" ON "Generation"("inferenceId", "modelId");

-- CreateIndex
CREATE UNIQUE INDEX "GenerationFeedback_generationId_key" ON "GenerationFeedback"("generationId");

-- CreateIndex
CREATE INDEX "OutputImage_generationId_idx" ON "OutputImage"("generationId");

-- CreateIndex
CREATE INDEX "Purchase_userId_idx" ON "Purchase"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");
