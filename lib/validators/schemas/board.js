const Joi = require('joi');

const getBoardReqBodySchema = Joi.object({
  id: Joi.string().required(),
});

const createBoardReqBodySchema = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string(),
});

const updateBoardReqBodySchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  desc: Joi.string(),
});

const deleteBoardReqBodySchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  getBoardReqBodySchema,
  createBoardReqBodySchema,
  updateBoardReqBodySchema,
  deleteBoardReqBodySchema,
};
