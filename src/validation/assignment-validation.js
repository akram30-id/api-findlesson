import Joi from "joi";

const createAssignmentValidation = Joi.object({
    subject_code: Joi.string().max(10).required(),
    class_code: Joi.string().max(10).required(),
    title: Joi.string().max(100).required(),
    description: Joi.string().required(),
    due_date: Joi.string().isoDate().required(),
    assignment_files: Joi.string().optional()
});

const getAssignmentValidation = Joi.string().max(10).required();

export {
    createAssignmentValidation,
    getAssignmentValidation
}