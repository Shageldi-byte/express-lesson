import Joi from "joi";

export const userSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    birthyear: Joi.number().integer().min(1970).max(2013).required(),
    fullname: Joi.string().required()
});



