const pointDao = require("../models/point");


class pointsController {
  constructor(con) {
    this.dao = new pointDao(con, "pointsofinterest"); 
  }

  async findAllPoints(req, res) {
    try {
      const point = await this.dao.findAllPoints();

      if (point == null) {
        res.status(404).json({ message: "No points of interest found" });
      } else {
        res.json(point);
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  async findByRegion(req, res) {
    try {
      const point = await this.dao.findByRegion(req.params.region);

      if (point == null) {
        res.status(404).json({ message: "No region found with this name" });
      } else {
        res.json(point);
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  async recommend(req, res) {
    try {
      const point = await this.dao.recommend(req.params.id);

      if (point == null) {
        res.status(404).json({ message: "Could not update recommendations" });
      } else {
        point.message = "Recommendation updated successfully";
        res.json(point);
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  async createPoint(req, res) {
    try {
      const point = await this.dao.createPoint(req.body);

      if (point == null) {
        res.status(404).json({ message: "Could not create new point of interest" });
      } else {
        point.message = "Point of interest created successfully";
        res.status(201).json(point);
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }



}

module.exports = pointsController;
