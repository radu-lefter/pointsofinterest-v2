const express = require('express');
const authRouter = express.Router();
const con = require('../db');



authRouter.post('/login', (req, res) => {
    con.query(`SELECT * FROM poi_users WHERE username = ? AND password = ?`, 
    [req.body.username, req.body.password],
        (error,results,fields) => { 
        if(error) {
            res.status(500).json({ error: error });
        } else {
            if(results.length == 1) {
            req.session.username = req.body.username;
            console.log(req.session);
            // req.session.save(()=>{
                
            // });
            return res.json({"message":`Logged in as ${req.session.username}`});
            
            }else{
            res.json({"message":`Incorrect username or password`});
            }
        }
    });
});

authRouter.post('/logout', (req, res) => {
    req.session = null;
    res.json({'success': 1 });
});



module.exports = authRouter;