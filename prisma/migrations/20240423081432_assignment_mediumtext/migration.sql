/*
  Warnings:

  - You are about to alter the column `due_date` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exam_date` on the `exam_schedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `assignments` MODIFY `due_date` DATETIME NOT NULL,
    MODIFY `assignment_files` MEDIUMTEXT NULL;

-- AlterTable
ALTER TABLE `exam_schedules` MODIFY `exam_date` DATETIME NOT NULL;
