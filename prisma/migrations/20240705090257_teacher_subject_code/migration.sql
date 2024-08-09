/*
  Warnings:

  - You are about to alter the column `due_date` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exam_date` on the `exam_schedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `teacher_class_code` on the `teachers_subjects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teacher_subject_code]` on the table `teachers_subjects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teacher_subject_code` to the `teachers_subjects` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `teachers_subjects_teacher_class_code_key` ON `teachers_subjects`;

-- AlterTable
ALTER TABLE `assignments` MODIFY `due_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `exam_schedules` MODIFY `exam_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `teachers_subjects` DROP COLUMN `teacher_class_code`,
    ADD COLUMN `teacher_subject_code` VARCHAR(10) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `teachers_subjects_teacher_subject_code_key` ON `teachers_subjects`(`teacher_subject_code`);
