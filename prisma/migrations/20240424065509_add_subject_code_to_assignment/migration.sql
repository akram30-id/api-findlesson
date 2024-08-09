/*
  Warnings:

  - You are about to drop the column `teacher_code` on the `assignments` table. All the data in the column will be lost.
  - You are about to alter the column `due_date` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exam_date` on the `exam_schedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `subject_code` to the `assignments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `assignments` DROP FOREIGN KEY `assignments_teacher_code_fkey`;

-- AlterTable
ALTER TABLE `assignments` DROP COLUMN `teacher_code`,
    ADD COLUMN `subject_code` VARCHAR(10) NOT NULL,
    MODIFY `due_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `exam_schedules` MODIFY `exam_date` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `assignments` ADD CONSTRAINT `assignments_subject_code_fkey` FOREIGN KEY (`subject_code`) REFERENCES `subjects`(`subject_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
