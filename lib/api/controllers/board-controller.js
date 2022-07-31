const {
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard,
} = require('../services/board-service');
const { validate } = require('../../validators/validator');
const {
  getBoardReqBodySchema,
  createBoardReqBodySchema,
  updateBoardReqBodySchema,
  deleteBoardReqBodySchema,
} = require('../../validators/schemas/board');

class BoardController {
  async getBoard(req, res, next) {
    try {
      const { id } = req.params;
      validate(getBoardReqBodySchema, { id });

      const board = await getBoard(id);

      res.json(board);
    } catch (e) {
      next(e);
    }
  }

  async createBoard(req, res, next) {
    try {
      const body = req.body;
      validate(createBoardReqBodySchema, body);

      const board = await createBoard(body);

      res.json(board);
    } catch (e) {
      next(e);
    }
  }

  async updateBoard(req, res, next) {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateBody = { id, ...body };
      validate(updateBoardReqBodySchema, updateBody);

      const board = await updateBoard(updateBody);

      res.json(board);
    } catch (e) {
      next(e);
    }
  }

  async deleteBoard(req, res, next) {
    try {
      const { id } = req.params;
      validate(deleteBoardReqBodySchema, { id });

      await deleteBoard(id);

      res.json(`Board has been successfully deleted.`);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BoardController();
