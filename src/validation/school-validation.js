import Joi from "joi";

const createSchoolValidation = Joi.object({
    school_name: Joi.string().max(100).required(),
    lms_code: Joi.string().max(50).required(),
});

const createSchoolAddressValidation = Joi.object({
    complete_address: Joi.string().max(200).required(),
    district_code: Joi.string().max(10).required()
})

const getSchoolValidation = Joi.string().max(10).required();

export {
    createSchoolValidation,
    getSchoolValidation,
    createSchoolAddressValidation
}