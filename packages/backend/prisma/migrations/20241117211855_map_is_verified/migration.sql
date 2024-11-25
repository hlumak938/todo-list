/*
  Warnings:

  - You are about to drop the column `isVerified` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "isVerified",
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false;
