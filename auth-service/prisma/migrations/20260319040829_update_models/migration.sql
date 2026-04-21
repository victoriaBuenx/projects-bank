/*
  Warnings:

  - The values [STUDENT,TUTOR] on the enum `RoleType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `apellidoMaterno` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `apellidoPaterno` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `carrera` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `numeroControl` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `apellidoMaterno` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the column `apellidoPaterno` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the column `departamento` on the `Tutor` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Tutor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[controlNumber]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `career` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `controlNumber` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Tutor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherLastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleType_new" AS ENUM ('ADMIN', 'USER');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "RoleType_new" USING ("role"::text::"RoleType_new");
ALTER TYPE "RoleType" RENAME TO "RoleType_old";
ALTER TYPE "RoleType_new" RENAME TO "RoleType";
DROP TYPE "public"."RoleType_old";
COMMIT;

-- DropIndex
DROP INDEX "Student_numeroControl_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "apellidoMaterno",
DROP COLUMN "apellidoPaterno",
DROP COLUMN "carrera",
DROP COLUMN "nombre",
DROP COLUMN "numeroControl",
ADD COLUMN     "career" TEXT NOT NULL,
ADD COLUMN     "controlNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "apellidoMaterno",
DROP COLUMN "apellidoPaterno",
DROP COLUMN "departamento",
DROP COLUMN "nombre",
ADD COLUMN     "department" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "motherLastName" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Student_controlNumber_key" ON "Student"("controlNumber");
