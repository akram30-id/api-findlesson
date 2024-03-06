import Joi from "joi";

const createGradeValidation = Joi.object({
    grade_name: Joi.string().max(50).required(),
    major_code: Joi.string().max(10).required()
});

const getGradeValidation = Joi.string().max(50).required();

export {
    createGradeValidation,
    getGradeValidation
}