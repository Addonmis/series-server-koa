import Joi from "joi";

const schema = Joi.object().keys({
    username: Joi.string()
        .min(4)
        .max(10)
        .alphanum()
        .required(),
    
    password: Joi.string()
        .min(8)
        .max(20)
        .required(),
});

export default schema;