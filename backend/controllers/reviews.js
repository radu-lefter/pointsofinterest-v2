const reviewDao = require("../models/review");


class reviewsController {
  constructor(con) {
    this.dao = new reviewDao(con, "poi_reviews");
  }

  async findAllReviews(req, res) {
    try {
      const review = await this.dao.findAllReviews();

      if (review == null) {
        res.status(404).json({ error: "No reviews found" });
      } else {
        res.json(review);
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  async findByPoint(req, res) {
    try {
      const review = await this.dao.findByPoint(req.params.region);

      if (review == null) {
        res.status(404).json({ error: "No region found with this name" });
      } else {
        res.json(review);
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }


  async createReview(req, res) {
    try {
      const review = await this.dao.createReview(req.body);

      if (review == null) {
        res.status(404).json({ error: "Could not create new review" });
      } else {
        review.message = "Review created successfully";
        res.json(review);
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }



}

module.exports = reviewsController;
