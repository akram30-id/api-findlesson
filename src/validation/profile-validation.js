import Joi from "joi";

const createProfileValidation = Joi.object({
    name: Joi.string().max(50).required(),
    phone: Joi.string().max(16).required(),
    address: Joi.string().max(200).required(),
    avatar: Joi.string().max(250).optional(),
});

const updateProfileValidation = Joi.object({
    name: Joi.string().max(50).required(),
    phone: Joi.string().max(16).optional(),
    address: Joi.string().max(200).optional(),
    avatar: Joi.string().max(250).optional(),
});

export {
    createProfileValidation,
    updateProfileValidation
}