import Joi from "joi";

const createLmsValidation = Joi.object({
    lmsCode: Joi.string().max(50).required(),
    templateCode: Joi.string().max(50).required()
});

const getLmsValidation = Joi.string().max(50).required();


export {
    createLmsValidation,
    getLmsValidation
}