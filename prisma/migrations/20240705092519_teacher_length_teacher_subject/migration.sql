/*
  Warnings:

  - You are about to alter the column `due_date` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exam_date` on the `exam_schedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `teachers_subjects` DROP FOREIGN KEY `teachers_subjects_teacher_code_fkey`;

-- AlterTable
ALTER TABLE `assignments` MODIFY `due_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `exam_schedules` MODIFY `exam_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `teachers_subjects` MODIFY `teacher_code` VARCHAR(20) NOT NULL;

-- AddForeignKey
ALTER TABLE `teachers_subjects` ADD CONSTRAINT `teachers_subjects_teacher_code_fkey` FOREIGN KEY (`teacher_code`) REFERENCES `teachers`(`teacher_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
