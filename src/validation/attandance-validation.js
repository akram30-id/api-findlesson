import Joi from "joi";

const clockInValidation = Joi.object({
    student_code: Joi.string().max(10).required(),
    school_code: Joi.string().max(50).required(),
    signature: Joi.string().required()
});

const attandanceCodeValidation = Joi.string().max(10).required();

export {
    clockInValidation,
    attandanceCodeValidation
}