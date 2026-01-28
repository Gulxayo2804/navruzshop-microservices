import Joi from "joi";

export const createProductSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price : Joi.number().positive().required(),
    stock : Joi.number().integer().min(0).required(),
    category : Joi.string().required()
})