const express = require('express');
const pointsRouter = express.Router();
const con = require('../db');
const pointsController = require("../controllers/points");
const pController = new pointsController(con);


pointsRouter.get('/', pController.findAllPoints.bind(pController));
pointsRouter.get('/:region', pController.findByRegion.bind(pController));
pointsRouter.put('/recommend/:id', pController.recommend.bind(pController));
pointsRouter.post('/create', pController.createPoint.bind(pController));


pointsRouter.put('/update/:id', (req, res) => {
    con.query(`UPDATE pointsofinterest 
    SET name=?, type=?, country=?, 
    region=?, lon=?, lat=?, description=?, recommendations=? 
    WHERE id=?`, 
    [
      poi.name, poi.type,
      poi.country, poi.region,
      poi.lon, poi.lat,
      poi.description, poi.recommendations, id
    ],
        (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});

pointsRouter.delete('/delete/id', (req, res) => {
    con.query(`DELETE FROM pointsofinterest WHERE id=?`, 
    [id],
        (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            res.json(results);
        }
    });
});






module.exports = pointsRouter;