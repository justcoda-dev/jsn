import Joi from "joi";

export const textInputSchema = Joi.string().min(5).required()
