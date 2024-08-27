import Joi from "joi";

const createFacultyValidation = Joi.object({
    faculty_name: Joi.string().max(50).required(),
    school_code: Joi.string().max(10).required()
});

const getFacultyValidation = Joi.string().max(10).required();

const pageFacultyValidation = Joi.number().min(1).positive().default(1);

const sizeFacultyValidation = Joi.number().min(1).positive().max(100).default(10);

export {
    createFacultyValidation,
    getFacultyValidation,
    pageFacultyValidation,
    sizeFacultyValidation
}