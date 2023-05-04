/*
  Warnings:

  - You are about to drop the column `measurement` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `measurementType` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `unit` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitType` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "measurement",
DROP COLUMN "measurementType",
ADD COLUMN     "unit" TEXT NOT NULL,
ADD COLUMN     "unitType" TEXT NOT NULL;
