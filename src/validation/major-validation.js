import Joi from "joi";

const createMajorValidation = Joi.object({
    major_name: Joi.string().max(50).required(),
    faculty_code: Joi.string().max(10).required()
});

const getMajorValidation = Joi.string().max(10).required();

const pageMajorValidation = Joi.number().min(1).positive().default(1);

const sizeMajorValidation = Joi.number().min(1).positive().max(100).default(10);

export {
    createMajorValidation,
    getMajorValidation,
    pageMajorValidation,
    sizeMajorValidation
}