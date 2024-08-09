/*
  Warnings:

  - You are about to alter the column `due_date` on the `assignments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `exam_date` on the `exam_schedules` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `clock_end` to the `class_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clock_start` to the `class_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clock_end` to the `exam_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clock_start` to the `exam_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clock_in_limit` to the `schools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clock_out_limit` to the `schools` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assignments` MODIFY `due_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `class_schedules` ADD COLUMN `clock_end` VARCHAR(8) NOT NULL,
    ADD COLUMN `clock_start` VARCHAR(8) NOT NULL;

-- AlterTable
ALTER TABLE `exam_schedules` ADD COLUMN `clock_end` VARCHAR(8) NOT NULL,
    ADD COLUMN `clock_start` VARCHAR(8) NOT NULL,
    MODIFY `exam_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `schools` ADD COLUMN `clock_in_limit` VARCHAR(8) NOT NULL,
    ADD COLUMN `clock_out_limit` VARCHAR(8) NOT NULL;

-- CreateTable
CREATE TABLE `Attandence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attandence_code` VARCHAR(10) NOT NULL,
    `clock_in` VARCHAR(8) NOT NULL,
    `clock_out` VARCHAR(8) NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `signature` LONGTEXT NOT NULL,
    `student_code` VARCHAR(10) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Attandence` ADD CONSTRAINT `Attandence_student_code_fkey` FOREIGN KEY (`student_code`) REFERENCES `students`(`student_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
