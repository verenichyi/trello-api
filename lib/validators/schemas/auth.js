const Joi = require('joi');

const registrationBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(20).required(),
  role: Joi.string(),
});

const loginBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(20).required(),
});

module.exports = {
  registrationBodySchema,
  loginBodySchema,
};
