import Joi from "joi";

const createMajorValidation = Joi.object({
    major_name: Joi.string().max(50).required(),
    faculty_code: Joi.string().max(10).required()
});

const getMajorValidation = Joi.string().max(10).required();

export {
    createMajorValidation,
    getMajorValidation
}