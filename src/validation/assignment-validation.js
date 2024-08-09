import Joi from "joi";

const createAssignmentValidation = Joi.object({
    subject_code: Joi.string().max(10).required(),
    class_code: Joi.string().max(10).required(),
    title: Joi.string().max(100).required(),
    description: Joi.string().required(),
    due_date: Joi.string().isoDate().required()
});

const getAssignmentValidation = Joi.string().max(10).required();

const getAssignmentFile = Joi.object({
    assignment_code: Joi.string().max(10).required(),
    file_path: Joi.string().required()
});

const createMultichoiceValidation = Joi.object({
    question: Joi.string().max(200).required(),
    question_image: Joi.string().optional(),
    answer_key: Joi.string().max(4).required(),
    choices: Joi.array().items(Joi.string()),
    assignment_code: Joi.string().max(10).required()
});

const getFileValidation = Joi.string().max(10).required();

const updateMultichoiceValidation = Joi.object({
    question: Joi.string().max(200).required(),
    question_image: Joi.string().optional(),
    answer_key: Joi.string().max(4).required(),
    choices: Joi.array().items(Joi.string()),
    assignment_multi_code: Joi.string().max(10).required()
});

const submitAssignmentValidation = Joi.object({
    submit_note: Joi.string().max(200).optional(),
    student_code: Joi.string().max(10).required(),
    assignment_code: Joi.string().max(10).required(),
    submit_file: Joi.string().optional()
});

const createScoreValidation = Joi.object({
    assignment_submit_code: Joi.string().max(10).required(),
    score: Joi.number().min(1).positive().max(100).required(),
    teacher_code: Joi.string().max(10).required()
});

const updateScoreValidation = Joi.object({
    assignment_score_code: Joi.string().max(10).required(),
    score: Joi.number().min(1).positive().max(100).required(),
    teacher_code: Joi.string().max(10).required()
})

export {
    createAssignmentValidation,
    getAssignmentValidation,
    getAssignmentFile,
    getFileValidation,
    createMultichoiceValidation,
    updateMultichoiceValidation,
    submitAssignmentValidation,
    createScoreValidation,
    updateScoreValidation
}