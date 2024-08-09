/*
  Warnings:

  - You are about to alter the column `due_date` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exam_date` on the `exam_schedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `assignments` MODIFY `due_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `exam_schedules` MODIFY `exam_date` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `AssignmentMultichoiceAnswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `answer` VARCHAR(4) NOT NULL,
    `student_code` VARCHAR(10) NOT NULL,
    `assignment_multi_code` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssignmentMultichoiceAnswer` ADD CONSTRAINT `AssignmentMultichoiceAnswer_student_code_fkey` FOREIGN KEY (`student_code`) REFERENCES `students`(`student_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignmentMultichoiceAnswer` ADD CONSTRAINT `AssignmentMultichoiceAnswer_assignment_multi_code_fkey` FOREIGN KEY (`assignment_multi_code`) REFERENCES `assignment_multichoice`(`assignment_multi_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
