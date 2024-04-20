import Joi from "joi"

const createSubjectValidation = Joi.object({
    title: Joi.string().max(50).required(),
    teacher_code: Joi.string().max(50).required(),
    major_code: Joi.string().max(10).required(),
    school_code: Joi.string().max(10).required()
});

const getSubjectValidation = Joi.string().max(10).required();

const updateSubjectValidation = Joi.object({
    title: Joi.string().max(50).required(),
    teacher_code: Joi.string().max(50).required(),
    major_code: Joi.string().max(10).required()
});

const assingToClassValidation = Joi.object({
    class_code: Joi.string().max(10).required(),
    subject_code: Joi.string().max(10).required(),
})

export {
    createSubjectValidation,
    getSubjectValidation,
    updateSubjectValidation,
    assingToClassValidation
}