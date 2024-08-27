import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().max(32).required(),
    email: Joi.string().max(50).email().required(),
    password: Joi.string().max(100).required(),
    role: Joi.string().max(16).optional()
});

const loginUserValidation = Joi.object({
    username: Joi.string().max(32).optional(),
    email: Joi.string().max(50).email().optional(),
    password: Joi.string().max(100).required()
});

const getUserValidation = Joi.string().max(32).required();

const updatePasswordValidation = Joi.object({
    username: Joi.string().max(32).required(),
    old_password: Joi.string().max(100).required(),
    confirm_password: Joi.string().max(100).required(),
    new_password: Joi.string().max(100).required()
});

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updatePasswordValidation
}