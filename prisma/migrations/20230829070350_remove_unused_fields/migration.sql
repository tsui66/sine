/*
  Warnings:

  - You are about to drop the column `completed_at` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `error` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `input` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `logs` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `metrics` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `output` on the `Generation` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Generation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Generation" DROP COLUMN "completed_at",
DROP COLUMN "error",
DROP COLUMN "input",
DROP COLUMN "logs",
DROP COLUMN "metrics",
DROP COLUMN "output",
DROP COLUMN "version";
