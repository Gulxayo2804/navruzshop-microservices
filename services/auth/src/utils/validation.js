const Joi = require('joi');

const validateRegistration = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

module.exports = { validateRegistration }