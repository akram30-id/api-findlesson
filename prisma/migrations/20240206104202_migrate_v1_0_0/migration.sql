-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NULL,
    `role` VARCHAR(16) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `templates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `template_code` VARCHAR(50) NOT NULL,
    `template_name` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `templates_template_code_key`(`template_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `avatar` VARCHAR(200) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `username` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `profiles_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lms_code` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `profile_id` INTEGER NOT NULL,
    `template_code` VARCHAR(50) NOT NULL,
    `school_code` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teachers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacher_code` VARCHAR(50) NOT NULL,
    `name` VARCHAR(50) NULL,
    `address` VARCHAR(200) NULL,
    `birthdate` VARCHAR(12) NULL,
    `born` DATE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `school_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `teachers_teacher_code_key`(`teacher_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_code` VARCHAR(10) NOT NULL,
    `school_name` VARCHAR(100) NOT NULL,
    `is_online` SMALLINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `schools_school_code_key`(`school_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provinces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `province_code` VARCHAR(10) NOT NULL,
    `province_name` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `provinces_province_code_key`(`province_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city_code` VARCHAR(10) NOT NULL,
    `city_name` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `province_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `cities_city_code_key`(`city_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `districts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `district_code` VARCHAR(10) NOT NULL,
    `district_name` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `city_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `districts_district_code_key`(`district_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `school_addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `complete_address` VARCHAR(200) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `district_code` VARCHAR(10) NOT NULL,
    `school_code` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faculties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `faculty_code` VARCHAR(10) NOT NULL,
    `faculty_name` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `school_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `faculties_faculty_code_key`(`faculty_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `majors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `major_code` VARCHAR(10) NOT NULL,
    `major_name` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `faculty_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `majors_major_code_key`(`major_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grade_code` VARCHAR(10) NOT NULL,
    `grade_name` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `major_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `grades_grade_code_key`(`grade_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `class_code` VARCHAR(10) NOT NULL,
    `class_name` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `grade_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `classes_class_code_key`(`class_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subjects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject_code` VARCHAR(10) NOT NULL,
    `subject_name` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `teacher_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `subjects_subject_code_key`(`subject_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `class_subjects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `class_subject_code` VARCHAR(10) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `class_code` VARCHAR(10) NOT NULL,
    `subject_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `class_subjects_class_subject_code_key`(`class_subject_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `class_schedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `class_schedule_code` VARCHAR(10) NOT NULL,
    `days` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `subject_code` VARCHAR(10) NOT NULL,
    `class_code` VARCHAR(10) NOT NULL,
    `teacher_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `class_schedules_class_schedule_code_key`(`class_schedule_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_code` VARCHAR(10) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `subtitle` VARCHAR(150) NOT NULL,
    `description` MEDIUMTEXT NOT NULL,
    `material_files` LONGTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `class_subject_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `materials_material_code_key`(`material_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_code` VARCHAR(10) NOT NULL,
    `student_name` VARCHAR(50) NOT NULL,
    `faculty_code` VARCHAR(10) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `school_code` VARCHAR(10) NOT NULL,
    `major_code` VARCHAR(10) NOT NULL,
    `grade_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `students_student_code_key`(`student_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `complete_address` VARCHAR(200) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `district_code` VARCHAR(10) NOT NULL,
    `student_code` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_class_code` VARCHAR(10) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `student_code` VARCHAR(10) NOT NULL,
    `class_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `student_classes_student_class_code_key`(`student_class_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assignments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignment_code` VARCHAR(10) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `due_date` DATETIME NOT NULL,
    `assignment_files` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `class_code` VARCHAR(10) NOT NULL,
    `teacher_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `assignments_assignment_code_key`(`assignment_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assignment_submits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignment_submit_code` VARCHAR(10) NOT NULL,
    `submit_note` VARCHAR(200) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `student_code` VARCHAR(10) NOT NULL,
    `assignment_code` VARCHAR(10) NOT NULL,
    `teacher_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `assignment_submits_assignment_submit_code_key`(`assignment_submit_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assignment_scores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignment_score_code` VARCHAR(10) NOT NULL,
    `score` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assign_submit_code` VARCHAR(10) NOT NULL,
    `teacher_code` VARCHAR(10) NOT NULL,
    `student_code` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exam_code` VARCHAR(10) NOT NULL,
    `time_limit` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `student_class_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `exams_exam_code_key`(`exam_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_schedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exam_schedule_code` VARCHAR(10) NOT NULL,
    `exam_date` DATETIME NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `exam_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `exam_schedules_exam_schedule_code_key`(`exam_schedule_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exam_type_code` VARCHAR(10) NOT NULL,
    `exam_type_name` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `exam_types_exam_type_code_key`(`exam_type_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_questions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_code` VARCHAR(10) NOT NULL,
    `main_question` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `question_file` TEXT NOT NULL,
    `value` INTEGER NOT NULL,
    `exam_code` VARCHAR(10) NOT NULL,
    `exam_type_code` VARCHAR(10) NOT NULL,
    `exam_schedule_code` VARCHAR(10) NOT NULL,
    `teacher_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `exam_questions_question_code_key`(`question_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_answers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exam_answer_code` VARCHAR(10) NOT NULL,
    `exam_answer_multichoice` VARCHAR(5) NULL,
    `examm_answer_essay` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `question_code` VARCHAR(10) NOT NULL,
    `teacher_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `exam_answers_exam_answer_code_key`(`exam_answer_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_submits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_true` BIT(1) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `exam_submit_code` VARCHAR(24) NOT NULL,
    `question_code` VARCHAR(10) NOT NULL,
    `exam_answer_code` VARCHAR(10) NOT NULL,
    `student_code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `exam_submits_exam_submit_code_key`(`exam_submit_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_scores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exam_score_code` VARCHAR(10) NOT NULL,
    `total_true` INTEGER NOT NULL,
    `total_false` INTEGER NOT NULL,
    `total_score` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `exam_submit_code` VARCHAR(24) NOT NULL,

    UNIQUE INDEX `exam_scores_exam_score_code_key`(`exam_score_code`),
    UNIQUE INDEX `exam_scores_exam_submit_code_key`(`exam_submit_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lms` ADD CONSTRAINT `lms_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lms` ADD CONSTRAINT `lms_template_code_fkey` FOREIGN KEY (`template_code`) REFERENCES `templates`(`template_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lms` ADD CONSTRAINT `lms_school_code_fkey` FOREIGN KEY (`school_code`) REFERENCES `schools`(`school_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_school_code_fkey` FOREIGN KEY (`school_code`) REFERENCES `schools`(`school_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cities` ADD CONSTRAINT `cities_province_code_fkey` FOREIGN KEY (`province_code`) REFERENCES `provinces`(`province_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `districts` ADD CONSTRAINT `districts_city_code_fkey` FOREIGN KEY (`city_code`) REFERENCES `cities`(`city_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `school_addresses` ADD CONSTRAINT `school_addresses_district_code_fkey` FOREIGN KEY (`district_code`) REFERENCES `districts`(`district_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `school_addresses` ADD CONSTRAINT `school_addresses_school_code_fkey` FOREIGN KEY (`school_code`) REFERENCES `schools`(`school_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faculties` ADD CONSTRAINT `faculties_school_code_fkey` FOREIGN KEY (`school_code`) REFERENCES `schools`(`school_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `majors` ADD CONSTRAINT `majors_faculty_code_fkey` FOREIGN KEY (`faculty_code`) REFERENCES `faculties`(`faculty_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_major_code_fkey` FOREIGN KEY (`major_code`) REFERENCES `majors`(`major_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `classes_grade_code_fkey` FOREIGN KEY (`grade_code`) REFERENCES `grades`(`grade_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subjects` ADD CONSTRAINT `subjects_teacher_code_fkey` FOREIGN KEY (`teacher_code`) REFERENCES `teachers`(`teacher_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_subjects` ADD CONSTRAINT `class_subjects_class_code_fkey` FOREIGN KEY (`class_code`) REFERENCES `classes`(`class_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_subjects` ADD CONSTRAINT `class_subjects_subject_code_fkey` FOREIGN KEY (`subject_code`) REFERENCES `subjects`(`subject_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_schedules` ADD CONSTRAINT `class_schedules_subject_code_fkey` FOREIGN KEY (`subject_code`) REFERENCES `subjects`(`subject_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_schedules` ADD CONSTRAINT `class_schedules_class_code_fkey` FOREIGN KEY (`class_code`) REFERENCES `classes`(`class_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_schedules` ADD CONSTRAINT `class_schedules_teacher_code_fkey` FOREIGN KEY (`teacher_code`) REFERENCES `teachers`(`teacher_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materials` ADD CONSTRAINT `materials_class_subject_code_fkey` FOREIGN KEY (`class_subject_code`) REFERENCES `class_subjects`(`class_subject_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_school_code_fkey` FOREIGN KEY (`school_code`) REFERENCES `schools`(`school_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_major_code_fkey` FOREIGN KEY (`major_code`) REFERENCES `majors`(`major_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_grade_code_fkey` FOREIGN KEY (`grade_code`) REFERENCES `grades`(`grade_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_addresses` ADD CONSTRAINT `student_addresses_district_code_fkey` FOREIGN KEY (`district_code`) REFERENCES `districts`(`district_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_addresses` ADD CONSTRAINT `student_addresses_student_code_fkey` FOREIGN KEY (`student_code`) REFERENCES `students`(`student_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_classes` ADD CONSTRAINT `student_classes_student_code_fkey` FOREIGN KEY (`student_code`) REFERENCES `students`(`student_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_classes` ADD CONSTRAINT `student_classes_class_code_fkey` FOREIGN KEY (`class_code`) REFERENCES `classes`(`class_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignments` ADD CONSTRAINT `assignments_class_code_fkey` FOREIGN KEY (`class_code`) REFERENCES `classes`(`class_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignments` ADD CONSTRAINT `assignments_teacher_code_fkey` FOREIGN KEY (`teacher_code`) REFERENCES `teachers`(`teacher_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignment_submits` ADD CONSTRAINT `assignment_submits_student_code_fkey` FOREIGN KEY (`student_code`) REFERENCES `students`(`student_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignment_submits` ADD CONSTRAINT `assignment_submits_assignment_code_fkey` FOREIGN KEY (`assignment_code`) REFERENCES `assignments`(`assignment_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignment_submits` ADD CONSTRAINT `assignment_submits_teacher_code_fkey` FOREIGN KEY (`teacher_code`) REFERENCES `teachers`(`teacher_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignment_scores` ADD CONSTRAINT `assignment_scores_assign_submit_code_fkey` FOREIGN KEY (`assign_submit_code`) REFERENCES `assignment_submits`(`assignment_submit_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignment_scores` ADD CONSTRAINT `assignment_scores_teacher_code_fkey` FOREIGN KEY (`teacher_code`) REFERENCES `teachers`(`teacher_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignment_scores` ADD CONSTRAINT `assignment_scores_student_code_fkey` FOREIGN KEY (`student_code`) REFERENCES `students`(`student_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exams` ADD CONSTRAINT `exams_student_class_code_fkey` FOREIGN KEY (`student_class_code`) REFERENCES `student_classes`(`student_class_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_schedules` ADD CONSTRAINT `exam_schedules_exam_code_fkey` FOREIGN KEY (`exam_code`) REFERENCES `exams`(`exam_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_questions` ADD CONSTRAINT `exam_questions_exam_code_fkey` FOREIGN KEY (`exam_code`) REFERENCES `exams`(`exam_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_questions` ADD CONSTRAINT `exam_questions_exam_type_code_fkey` FOREIGN KEY (`exam_type_code`) REFERENCES `exam_types`(`exam_type_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_questions` ADD CONSTRAINT `exam_questions_exam_schedule_code_fkey` FOREIGN KEY (`exam_schedule_code`) REFERENCES `exam_schedules`(`exam_schedule_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_questions` ADD CONSTRAINT `exam_questions_teacher_code_fkey` FOREIGN KEY (`teacher_code`) REFERENCES `teachers`(`teacher_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_answers` ADD CONSTRAINT `exam_answers_question_code_fkey` FOREIGN KEY (`question_code`) REFERENCES `exam_questions`(`question_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_answers` ADD CONSTRAINT `exam_answers_teacher_code_fkey` FOREIGN KEY (`teacher_code`) REFERENCES `teachers`(`teacher_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_submits` ADD CONSTRAINT `exam_submits_question_code_fkey` FOREIGN KEY (`question_code`) REFERENCES `exam_questions`(`question_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_submits` ADD CONSTRAINT `exam_submits_exam_answer_code_fkey` FOREIGN KEY (`exam_answer_code`) REFERENCES `exam_answers`(`exam_answer_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_submits` ADD CONSTRAINT `exam_submits_student_code_fkey` FOREIGN KEY (`student_code`) REFERENCES `students`(`student_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_scores` ADD CONSTRAINT `exam_scores_exam_submit_code_fkey` FOREIGN KEY (`exam_submit_code`) REFERENCES `exam_submits`(`exam_submit_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
