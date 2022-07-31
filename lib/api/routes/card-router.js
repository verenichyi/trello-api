const Router = require('express').Router;
const {
  getCard,
  createCard,
  deleteCard,
  updateCard,
} = require('../controllers/card-controller');
const roleMiddleware = require('../../middlewares/role-middleware');

const router = new Router();

router.get('/:id', getCard);
router.post('/', roleMiddleware('admin'), createCard);
router.put('/:id', roleMiddleware('admin'), updateCard);
router.delete('/:id', roleMiddleware('admin'), deleteCard);

module.exports = router;
