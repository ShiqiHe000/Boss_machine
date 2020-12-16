const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./minions');
const ideaRouter = require('./ideas');
const meetingRouter = require('./meetings');

// minions router
apiRouter.use('/minions', minionsRouter);

// ideas router
apiRouter.use('/ideas', ideaRouter);

// meeting router
apiRouter.use('/meetings', meetingRouter);

module.exports = apiRouter;
