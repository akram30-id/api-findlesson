import Joi from "joi";

const createTemplateValidation = Joi.object({
    template_name: Joi.string().max(100).required(),
    path: Joi.string().max(32).required()
});

const getTemplateValidation = Joi.string().max(50).required();

const allTemplateValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10)
});

export {
    createTemplateValidation,
    getTemplateValidation,
    allTemplateValidation
}