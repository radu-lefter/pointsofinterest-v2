const express = require('express');
const cors = require('cors');
const corsMiddleware = require('./middleware/corsMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();
const port = process.env.PORT || 5000;
const frontend = process.env.frontend;
const pointsRouter = require('./routes/points');
const reviewsRouter = require('./routes/reviews');
const authRouter = require('./routes/auth');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserDao = require("./models/user")

//sessions

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


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//cors 

// let options = { origin: frontend,
// methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
// credentials: true };
// app.use(cors(options));

app.use(cors({
  origin:true,
  credentials:true
}));

//app.use(corsMiddleware);

//**************Passport */

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async(userid, done) => {
  try {
      const userDao = new UserDao(con, "poi_users");


      const details = await userDao.findById(userid);

      done(null, details);
  } catch(e) {
      done(e);
  }
});

passport.use(new LocalStrategy(async(username, password, done)=> {
   
  const userDao = new UserDao(con, "poi_users");
  try {
     
      const userDetails = await userDao.login(username, password);

     //console.log(userDetails);
      if(userDetails === null){
          return done(null, false);
      } else {
          
          return done(null, userDetails);
      }
  } catch(e) {
   
      return done(e);
  }
}));



app.post('/login',
    
    passport.authenticate('local'), 

    
    (req, res, next) => {
        
        res.json(req.user); 
    }
);

//****************** */

app.use('/auth', authRouter);
app.use('/points', authMiddleware, pointsRouter);
app.use('/reviews', authMiddleware, reviewsRouter);





app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  });