import Joi from "joi";

const createSchoolValidation = Joi.object({
    school_name: Joi.string().max(100).required(),
    lms_code: Joi.string().max(50).required(),
    clock_in_limit: Joi.string().max(8).required(),
    clock_out_limit: Joi.string().max(8).required(),
});

const createSchoolAddressValidation = Joi.object({
    complete_address: Joi.string().max(200).required(),
    district_code: Joi.string().max(10).required()
});

const pageSchoolValidation = Joi.number().min(1).positive().default(1);

const sizeSchoolValidation = Joi.number().min(1).positive().max(100).default(10);

const getSchoolValidation = Joi.string().max(10).required();

export {
    createSchoolValidation,
    getSchoolValidation,
    createSchoolAddressValidation,
    pageSchoolValidation,
    sizeSchoolValidation
}