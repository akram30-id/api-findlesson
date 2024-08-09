/*
  Warnings:

  - You are about to alter the column `due_date` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exam_date` on the `exam_schedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `major_code` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_code` to the `subjects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `subjects` DROP FOREIGN KEY `subjects_teacher_code_fkey`;

-- AlterTable
ALTER TABLE `assignments` MODIFY `due_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `exam_schedules` MODIFY `exam_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `subjects` ADD COLUMN `major_code` VARCHAR(10) NOT NULL,
    ADD COLUMN `school_code` VARCHAR(10) NOT NULL,
    MODIFY `teacher_code` VARCHAR(50) NOT NULL;

-- AddForeignKey
ALTER TABLE `subjects` ADD CONSTRAINT `subjects_school_code_fkey` FOREIGN KEY (`school_code`) REFERENCES `schools`(`school_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subjects` ADD CONSTRAINT `subjects_major_code_fkey` FOREIGN KEY (`major_code`) REFERENCES `majors`(`major_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subjects` ADD CONSTRAINT `subjects_teacher_code_fkey` FOREIGN KEY (`teacher_code`) REFERENCES `teachers`(`teacher_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
