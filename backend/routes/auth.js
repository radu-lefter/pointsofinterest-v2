const express = require('express');
const authRouter = express.Router();
const con = require('../db');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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
            return res.json({"message":`Logged in as ${req.body.username}`});
            
            }else{
            res.json({"message":`Incorrect username or password`});
            }
        }
    });
});


// passport.use(new LocalStrategy(async(username, password, done)=> {
   
//     const userDao = new UserDao(db);
//     try {
       
//         const userDetails = await userDao.login(username, password);

      
//         if(userDetails === null){
//             return done(null, false);
//         } else {
            
//             return done(null, userDetails);
//         }
//     } catch(e) {
     
//         return done(e);
//     }
// }));

// app.post('/login',
    
//     passport.authenticate('local'), 

    
//     (req, res, next) => {
        
//         res.json(req.user); 
//     }
// );

// passport.serializeUser((userDetails, done) => {
//     done(null, userDetails.id);
// });

// passport.deserializeUser(async(userid, done) => {
//     try {
//         const userDao = new UserDao(db);


//         const details = await userDao.findById(userid);

//         done(null, details);
//     } catch(e) {
//         done(e);
//     }
// });

module.exports = authRouter;