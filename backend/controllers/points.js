const pointDao = require("../dao/point");


class pointsController {
  constructor(con) {
    this.dao = new pointDao(con, "pointsofinterest");
  }

  async findAllPoints(req, res) {
    try {
      const point = await this.dao.findAllPoints();

      if (point == null) {
        res.status(404).json({ error: "No points of interest found" });
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
        res.status(404).json({ error: "No region found with this name" });
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
        res.status(404).json({ error: "Could not update recommendations" });
      } else {
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
        res.status(404).json({ error: "Could not create new point of interest" });
      } else {
        res.json(point);
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }



}

module.exports = pointsController;
