const express = require('express');
const pointsRouter = express.Router();
const con = require('../db');
const pointsController = require("../controllers/points");
const pController = new pointsController(con);


pointsRouter.get('/', pController.findAllPoints.bind(pController));
pointsRouter.get('/:region', pController.findByRegion.bind(pController));
pointsRouter.put('/recommend/:id', pController.recommend.bind(pController));
pointsRouter.post('/create', pController.createPoint.bind(pController));

// pointsRouter.get('/', (req, res) => {
//     con.query(`SELECT * FROM pointsofinterest`,[],
//         (error,results,fields) => { 
//         if(error) {
//             res.status(500).json({ error: error });
//         } else {
//             res.json(results);
//         }
//     });
// });


// pointsRouter.get('/:region', (req, res) => {
//     con.query(`SELECT * FROM pointsofinterest WHERE region LIKE '${req.params.region}'`, 
//         (error,results,fields) => { 
//         if(error) {
//             res.status(500).json({ error: error });
//         } else {
//             res.json(results);
//         }
//     });
// });

// pointsRouter.put('/recommend/:id', (req, res) => {
//     con.query(`UPDATE pointsofinterest 
//     SET recommendations= recommendations+1 
//     WHERE id='${req.params.id}'`, 
    
//         (error,results,fields) => { 
//         if(error) {
//             res.status(500).json({ error: error });
//         } else {
//             res.json(results);
//         }
//     });
// });


// pointsRouter.post('/create', (req, res) => {
//     con.query(`INSERT INTO pointsofinterest 
//     (name, type, country, region, lon, lat, description, recommendations) 
//     VALUES 
//     (?, ?, ?, ?, ?, ?, ?, ?)`, 
//     [
//       req.body.name, req.body.type,
//       req.body.country, req.body.region,
//       req.body.lon, req.body.lat,
//       req.body.description, req.body.recommendations
//     ],
//         (error,results,fields) => { 
//         if(error) {
//             res.status(500).json({ error: error });
//         } else {
//             res.json({"message":"Point created successfully"});
//         }
//     });
// });

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