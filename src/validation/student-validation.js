import Joi from "joi";

const createStudentValidation = Joi.object({
    student_name: Joi.string().max(50).required(),
    faculty_code: Joi.string().max(10).required(),
    school_code: Joi.string().max(10).required(),
    major_code: Joi.string().max(10).required(),
    grade_code: Joi.string().max(10).required(),
});

const createStudentAddressValidation = Joi.object({
    student_code: Joi.string().max(10).required(),
    complete_address: Joi.string().max(200).required(),
    district_code: Joi.string().max(10).required()
});

const getStudentValidation = Joi.string().max(10).required();

const getAllStudentValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().default(10),
})

export {
    createStudentValidation,
    createStudentAddressValidation,
    getStudentValidation,
    getAllStudentValidation
}