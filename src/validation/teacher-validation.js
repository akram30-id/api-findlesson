import Joi from "joi";

const createTeacherValidation = Joi.object({
    school_code: Joi.string().max(10).optional(),
    major_code: Joi.string().max(10).required(),
    name: Joi.string().max(50).required(),
    teacher_code: Joi.string().max(50).required(),
    born: Joi.string().max(50).optional(),
    birthdate: Joi.date().required(),
    address: Joi.string().max(200).optional()
});

const getTeacherValidation = Joi.string().max(50).required();

export {
    createTeacherValidation,
    getTeacherValidation
}