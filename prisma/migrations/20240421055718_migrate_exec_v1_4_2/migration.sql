/*
  Warnings:

  - You are about to alter the column `due_date` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exam_date` on the `exam_schedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `school_code` to the `Attandence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assignments` MODIFY `due_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `attandence` ADD COLUMN `school_code` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `exam_schedules` MODIFY `exam_date` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `Attandence` ADD CONSTRAINT `Attandence_school_code_fkey` FOREIGN KEY (`school_code`) REFERENCES `schools`(`school_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
