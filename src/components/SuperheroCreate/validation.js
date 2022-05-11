import Joi from "joi";
// Schema
export const textInputSchema = Joi.string().min(5).required()
// Validation
export const textInputValidate = (value) => {
    if (textInputSchema.validate(value).error) {
        const [details] = textInputSchema.validate(value).error.details
        return details.message
    }
    return null
};