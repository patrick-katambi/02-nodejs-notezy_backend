const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phoneNumber: Joi.string().pattern(new RegExp('^[0-9]+$')).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().alphanum().min(3).max(30).email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

module.exports = { registerSchema, loginSchema }