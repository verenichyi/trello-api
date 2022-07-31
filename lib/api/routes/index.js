const Router = require('express').Router;
const authRouter = require('./auth-router');
const boardRouter = require('./board-router');
const cardRouter = require('./card-router');
const authMiddleware = require('../../middlewares/auth-middleware');

const router = new Router();

router.use('/auth', authRouter);
router.use('/board', authMiddleware, boardRouter);
router.use('/card', authMiddleware, cardRouter);

module.exports = router;
