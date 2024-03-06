import Joi from "joi";

const createClassValidation = Joi.object({
    class_name: Joi.string().max(50).required(),
    grade_code: Joi.string().max(10).required(),
    class_code: Joi.string().max(10).optional()
});

const getClassValidation = Joi.string().max(10).required();

export {
    createClassValidation,
    getClassValidation
}