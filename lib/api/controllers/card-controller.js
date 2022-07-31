const {
  getCard,
  createCard,
  deleteCard,
  updateCard,
} = require('../services/card-service');
const { validate } = require('../../validators/validator');
const {
  getCardReqBodySchema,
  createCardReqBodySchema,
  updateCardReqBodySchema,
  deleteCardReqBodySchema,
} = require('../../validators/schemas/card');

class CardController {
  async getCard(req, res, next) {
    try {
      const { id } = req.params;
      validate(getCardReqBodySchema, { id });

      const board = await getCard(id);

      res.json(board);
    } catch (e) {
      next(e);
    }
  }

  async createCard(req, res, next) {
    try {
      const body = req.body;
      validate(createCardReqBodySchema, body);

      const card = await createCard(body);

      res.json(card);
    } catch (e) {
      next(e);
    }
  }

  async updateCard(req, res, next) {
    try {
      const { id } = req.params;
      const body = req.body;
      validate(updateCardReqBodySchema, { id, ...body });

      const board = await updateCard(id, body);

      res.json(board);
    } catch (e) {
      next(e);
    }
  }

  async deleteCard(req, res, next) {
    try {
      const { id } = req.params;
      validate(deleteCardReqBodySchema, { id });

      await deleteCard(id);

      res.json(`Card has been successfully deleted.`);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CardController();
