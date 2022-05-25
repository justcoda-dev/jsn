import Joi from "joi"

export const superheroSchema = Joi.object({
    nickname: Joi.string().min(3).max(100).required(),
    real_name: Joi.string().min(5).max(255).required(),
    origin_description: Joi.string().min(5).required(),
    superpowers: Joi.string().min(3).required(),
    catch_phrase: Joi.string().min(3).required(),
    images: Joi.array()
})
export const superheroUpdateSchema = Joi.object({
    id:Joi.number(),
    nickname: Joi.string().min(3).max(100).required(),
    real_name: Joi.string().min(5).max(255).required(),
    origin_description: Joi.string().min(5).required(),
    superpowers: Joi.string().min(3).required(),
    catch_phrase: Joi.string().min(3).required(),
    images: Joi.array(),
    createdAt:Joi.string(),
    updatedAt:Joi.string()
})
export const idSchema = Joi.number().required()