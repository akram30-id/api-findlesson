import Joi from "joi";

const createMaterialValidation = Joi.object({
    title: Joi.string().max(100).required(),
    subtitle: Joi.string().max(100).required(),
    description: Joi.string().required(),
    material_files: Joi.string().max(100).optional(),
    subject_code: Joi.string().max(10).required(),
});

const materialCodeValidation = Joi.string().max(10).required();

const updateMaterialValidation = Joi.object({
    title: Joi.string().max(100).required(),
    subtitle: Joi.string().max(100).required(),
    description: Joi.string().required()
});

export {
    createMaterialValidation,
    materialCodeValidation,
    updateMaterialValidation
}