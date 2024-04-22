import Joi from "joi"

const createSubjectValidation = Joi.object({
    title: Joi.string().max(50).required(),
    major_code: Joi.string().max(10).required(),
    grade_code: Joi.string().max(10).required()
});

const getSubjectValidation = Joi.string().max(10).required();

const updateSubjectValidation = Joi.object({
    title: Joi.string().max(50).required()
});

const assingToClassValidation = Joi.object({
    class_code: Joi.string().max(10).required(),
    subject_code: Joi.string().max(10).required(),
})

const assignToClassScheduleValidation = Joi.object({
    day: Joi.string().max(50).required(),
    clock_start: Joi.string().max(8).required(),
    clock_end: Joi.string().max(8).required(),
    class_code: Joi.string().max(10).required(),
    teacher_code: Joi.string().max(50).required(),
    subject_code: Joi.string().max(10).required(),
});

const updateClassScheduleValidation = Joi.object({
    day: Joi.string().max(50).required(),
    clock_start: Joi.string().max(8).required(),
    clock_end: Joi.string().max(8).required(),
    teacher_code: Joi.string().max(50).required()
});

const getDaysValidation = Joi.string().max(8).optional();

const getScheduleValidation = Joi.string().max(10).optional();

export {
    createSubjectValidation,
    getSubjectValidation,
    updateSubjectValidation,
    assingToClassValidation,
    assignToClassScheduleValidation,
    getDaysValidation,
    getScheduleValidation,
    updateClassScheduleValidation
}