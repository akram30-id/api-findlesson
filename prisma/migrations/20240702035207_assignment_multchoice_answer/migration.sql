/*
  Warnings:

  - You are about to alter the column `due_date` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exam_date` on the `exam_schedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `assignmentmultichoiceanswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `assignmentmultichoiceanswer` DROP FOREIGN KEY `AssignmentMultichoiceAnswer_assignment_multi_code_fkey`;

-- DropForeignKey
ALTER TABLE `assignmentmultichoiceanswer` DROP FOREIGN KEY `AssignmentMultichoiceAnswer_student_code_fkey`;

-- AlterTable
ALTER TABLE `assignments` MODIFY `due_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `exam_schedules` MODIFY `exam_date` DATETIME NOT NULL;

-- DropTable
DROP TABLE `assignmentmultichoiceanswer`;

-- CreateTable
CREATE TABLE `assignment_multichoice_answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `answer` VARCHAR(4) NOT NULL,
    `student_code` VARCHAR(10) NOT NULL,
    `assignment_multi_code` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `assignment_multichoice_answer` ADD CONSTRAINT `assignment_multichoice_answer_student_code_fkey` FOREIGN KEY (`student_code`) REFERENCES `students`(`student_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignment_multichoice_answer` ADD CONSTRAINT `assignment_multichoice_answer_assignment_multi_code_fkey` FOREIGN KEY (`assignment_multi_code`) REFERENCES `assignment_multichoice`(`assignment_multi_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
