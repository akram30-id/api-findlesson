/*
  Warnings:

  - You are about to drop the column `student_code` on the `assignment_multichoice` table. All the data in the column will be lost.
  - You are about to alter the column `due_date` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exam_date` on the `exam_schedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `assignment_multichoice` DROP FOREIGN KEY `assignment_multichoice_student_code_fkey`;

-- AlterTable
ALTER TABLE `assignment_multichoice` DROP COLUMN `student_code`;

-- AlterTable
ALTER TABLE `assignments` MODIFY `due_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `exam_schedules` MODIFY `exam_date` DATETIME NOT NULL;
