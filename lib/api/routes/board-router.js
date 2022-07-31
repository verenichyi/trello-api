const Router = require('express').Router;
const {
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard,
} = require('../controllers/board-controller');
const roleMiddleware = require('../../middlewares/role-middleware');

const router = new Router();

router.get('/:id', getBoard);
router.post('/', roleMiddleware('admin'), createBoard);
router.put('/:id', roleMiddleware('admin'), updateBoard);
router.delete('/:id', roleMiddleware('admin'), deleteBoard);

module.exports = router;
