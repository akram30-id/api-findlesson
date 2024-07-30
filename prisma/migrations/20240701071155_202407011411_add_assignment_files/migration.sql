/*
  Warnings:

  - You are about to drop the column `assignment_files` on the `assignments` table. All the data in the column will be lost.
  - You are about to alter the column `due_date` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exam_date` on the `exam_schedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `assignments` DROP COLUMN `assignment_files`,
    MODIFY `due_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `exam_schedules` MODIFY `exam_date` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `assignment_files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_code` VARCHAR(10) NOT NULL,
    `file_path` LONGTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignment_code` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `assignment_files` ADD CONSTRAINT `assignment_files_assignment_code_fkey` FOREIGN KEY (`assignment_code`) REFERENCES `assignments`(`assignment_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
