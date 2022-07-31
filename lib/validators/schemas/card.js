const Joi = require('joi');

const getCardReqBodySchema = Joi.object({
  id: Joi.string().required(),
});

const createCardReqBodySchema = Joi.object({
  boardId: Joi.string().required(),
  listName: Joi.string().required(),
  name: Joi.string().required(),
  desc: Joi.string(),
});

const updateCardReqBodySchema = Joi.object({
  id: Joi.string().required(),
  boardId: Joi.string().required(),
  listName: Joi.string().required(),
  name: Joi.string().required(),
  desc: Joi.string(),
});

const deleteCardReqBodySchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  getCardReqBodySchema,
  createCardReqBodySchema,
  updateCardReqBodySchema,
  deleteCardReqBodySchema,
};
