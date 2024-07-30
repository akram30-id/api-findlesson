/*
  Warnings:

  - You are about to alter the column `due_date` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exam_date` on the `exam_schedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `teacherclass` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `teacherclass` DROP FOREIGN KEY `TeacherClass_subject_code_fkey`;

-- DropForeignKey
ALTER TABLE `teacherclass` DROP FOREIGN KEY `TeacherClass_teacher_code_fkey`;

-- AlterTable
ALTER TABLE `assignments` MODIFY `due_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `exam_schedules` MODIFY `exam_date` DATETIME NOT NULL;

-- DropTable
DROP TABLE `teacherclass`;

-- CreateTable
CREATE TABLE `teachers_subjects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacher_class_code` VARCHAR(10) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `teacher_code` VARCHAR(10) NOT NULL,
    `subject_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `teachers_subjects_teacher_class_code_key`(`teacher_class_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `teachers_subjects` ADD CONSTRAINT `teachers_subjects_teacher_code_fkey` FOREIGN KEY (`teacher_code`) REFERENCES `teachers`(`teacher_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teachers_subjects` ADD CONSTRAINT `teachers_subjects_subject_code_fkey` FOREIGN KEY (`subject_code`) REFERENCES `subjects`(`subject_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
