/*
  Warnings:

  - You are about to drop the column `teacher_code` on the `assignment_submits` table. All the data in the column will be lost.
  - You are about to alter the column `due_date` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `examm_answer_essay` on the `exam_answers` table. All the data in the column will be lost.
  - You are about to alter the column `exam_date` on the `exam_schedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `submit_file` to the `assignment_submits` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `assignment_submits` DROP FOREIGN KEY `assignment_submits_teacher_code_fkey`;

-- AlterTable
ALTER TABLE `assignment_submits` DROP COLUMN `teacher_code`,
    ADD COLUMN `submit_file` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `assignments` ADD COLUMN `is_multiple` SMALLINT NULL,
    MODIFY `due_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `exam_answers` DROP COLUMN `examm_answer_essay`,
    ADD COLUMN `exam_answer_essay` TEXT NULL;

-- AlterTable
ALTER TABLE `exam_schedules` MODIFY `exam_date` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `assignment_multichoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignment_multi_code` VARCHAR(10) NOT NULL,
    `question` VARCHAR(200) NOT NULL,
    `question_image` MEDIUMTEXT NULL,
    `answer_key` VARCHAR(4) NOT NULL,
    `assignment_code` VARCHAR(10) NOT NULL,
    `student_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `assignment_multichoice_assignment_multi_code_key`(`assignment_multi_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `assignment_multichoice` ADD CONSTRAINT `assignment_multichoice_assignment_code_fkey` FOREIGN KEY (`assignment_code`) REFERENCES `assignments`(`assignment_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignment_multichoice` ADD CONSTRAINT `assignment_multichoice_student_code_fkey` FOREIGN KEY (`student_code`) REFERENCES `students`(`student_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
