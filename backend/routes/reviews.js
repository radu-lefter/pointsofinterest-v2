const express = require('express');
const reviewsRouter = express.Router();
const con = require('../db');
const reviewsController = require("../controllers/reviews");
const rController = new reviewsController(con);


reviewsRouter.get('/', rController.findAllReviews.bind(rController));
reviewsRouter.get('/:point', rController.findByPoint.bind(rController));
reviewsRouter.post('/create', rController.createReview.bind(rController));



module.exports = reviewsRouter;