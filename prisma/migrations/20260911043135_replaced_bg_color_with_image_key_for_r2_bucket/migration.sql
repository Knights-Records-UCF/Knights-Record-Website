/*
  Warnings:

  - You are about to drop the column `backgroundColor` on the `Announcement` table. All the data in the column will be lost.
  - Added the required column `imageKey` to the `Announcement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "backgroundColor",
ADD COLUMN     "imageKey" TEXT NOT NULL;
