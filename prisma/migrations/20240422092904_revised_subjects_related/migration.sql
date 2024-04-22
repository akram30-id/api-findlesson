/*
  Warnings:

  - You are about to alter the column `due_date` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `days` on the `class_schedules` table. All the data in the column will be lost.
  - You are about to alter the column `exam_date` on the `exam_schedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `class_subject_code` on the `materials` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_code` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the `class_subjects` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `day` to the `class_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_code` to the `materials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade_code` to the `subjects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `class_subjects` DROP FOREIGN KEY `class_subjects_class_code_fkey`;

-- DropForeignKey
ALTER TABLE `class_subjects` DROP FOREIGN KEY `class_subjects_subject_code_fkey`;

-- DropForeignKey
ALTER TABLE `materials` DROP FOREIGN KEY `materials_class_subject_code_fkey`;

-- DropForeignKey
ALTER TABLE `subjects` DROP FOREIGN KEY `subjects_teacher_code_fkey`;

-- AlterTable
ALTER TABLE `assignments` MODIFY `due_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `class_schedules` DROP COLUMN `days`,
    ADD COLUMN `day` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `exam_schedules` MODIFY `exam_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `materials` DROP COLUMN `class_subject_code`,
    ADD COLUMN `subject_code` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `subjects` DROP COLUMN `teacher_code`,
    ADD COLUMN `grade_code` VARCHAR(10) NOT NULL;

-- DropTable
DROP TABLE `class_subjects`;

-- AddForeignKey
ALTER TABLE `subjects` ADD CONSTRAINT `subjects_grade_code_fkey` FOREIGN KEY (`grade_code`) REFERENCES `grades`(`grade_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materials` ADD CONSTRAINT `materials_subject_code_fkey` FOREIGN KEY (`subject_code`) REFERENCES `subjects`(`subject_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
