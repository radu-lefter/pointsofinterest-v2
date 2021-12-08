const express = require('express');
const cors = require('cors');
const corsMiddleware = require('./middleware/corsMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();
const port = process.env.PORT || 5000;
const pointsRouter = require('./routes/points');
const reviewsRouter = require('./routes/reviews');
const authRouter = require('./routes/auth');

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
//const UserDao = require("./dao/user")

var cookieParser = require('cookie-parser')
const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);
const con = require('./db');
const sessionStore = new MySQLStore({ } , con.promise());

const app = express();

app.use(expressSession({
    store: sessionStore, 
    secret: 'bigsecret', 
    resave: false, 
    saveUninitialized: false, 
    rolling: true, 
    unset: 'destroy', 
    proxy: true, 
    cookie: { 
        maxAge: 60000, 
        httpOnly: true
    }
}));

app.use(cookieParser('BinnieAndClyde'))

//app.set('trust proxy', 1)

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
let options = { origin: 'http://localhost:5500',
methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
credentials: true };
app.use(cors(options));
app.use(corsMiddleware);

//**************Passport */

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser(async(userid, done) => {
//   try {
//       const userDao = new UserDao(con, "poi_users");


//       const details = await userDao.findById(userid);

//       done(null, details);
//   } catch(e) {
//       done(e);
//   }
// });

// passport.use(new LocalStrategy(async(username, password, done)=> {
   
//   const userDao = new UserDao(con, "poi_users");
//   try {
     
//       const userDetails = await userDao.login(username, password);

//      //console.log(userDetails);
//       if(userDetails === null){
//           return done(null, false);
//       } else {
          
//           return done(null, userDetails);
//       }
//   } catch(e) {
   
//       return done(e);
//   }
// }));



// app.post('/login',
    
//     passport.authenticate('local'), 

    
//     (req, res, next) => {
        
//         res.json(req.user); 
//     }
// );

//****************** */

app.use('/auth', authRouter);

//app.use(authMiddleware);

app.use('/points', authMiddleware, pointsRouter);
app.use('/reviews', authMiddleware, reviewsRouter);





app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  });