/*
  Warnings:

  - You are about to drop the column `productFile` on the `Product` table. All the data in the column will be lost.
  - Added the required column `codeUrl` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productFile",
ADD COLUMN     "codeUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "icon" TEXT NOT NULL;
