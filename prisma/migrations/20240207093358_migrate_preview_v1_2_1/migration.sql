/*
  Warnings:

  - You are about to alter the column `due_date` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exam_date` on the `exam_schedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `school_code` on the `lms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lms_code]` on the table `lms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lms_code` to the `schools` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `lms` DROP FOREIGN KEY `lms_school_code_fkey`;

-- AlterTable
ALTER TABLE `assignments` MODIFY `due_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `exam_schedules` MODIFY `exam_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `lms` DROP COLUMN `school_code`;

-- AlterTable
ALTER TABLE `schools` ADD COLUMN `lms_code` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `lms_lms_code_key` ON `lms`(`lms_code`);

-- AddForeignKey
ALTER TABLE `schools` ADD CONSTRAINT `schools_lms_code_fkey` FOREIGN KEY (`lms_code`) REFERENCES `lms`(`lms_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
