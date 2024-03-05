import Joi from "joi";

const createFacultyValidation = Joi.object({
    faculty_name: Joi.string().max(50).required(),
    school_code: Joi.string().max(10).required()
});

const getFacultyValidation = Joi.string().max(10).required();

export {
    createFacultyValidation,
    getFacultyValidation
}