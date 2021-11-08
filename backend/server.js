const express = require('express');
const cors = require('cors');
const corsMiddleware = require('./middleware/corsMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();
const port = process.env.PORT || 5000;
const pointsRouter = require('./routes/points');
const authRouter = require('./routes/auth');

const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);
const con = require('./db');
const sessionStore = new MySQLStore({ } , con.promise());

const app = express();

app.use(expressSession({
    store: sessionStore, 
    secret: 'BinnieAndClyde', 
    resave: false, 
    saveUninitialized: false, 
    rolling: true, 
    unset: 'destroy', 
    proxy: true, 
    cookie: { 
        maxAge: 600000, // 600000 ms = 10 mins expiry time
        httpOnly: false, // allow client-side code to access the cookie, otherwise it's kept to the HTTP messages
        secure: false,
        sameSite: 'none'
    }
}));

app.set('trust proxy', 1)

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors({ origin: true, credentials: true }));
app.use(corsMiddleware);


app.use('/auth', authRouter);

app.use(authMiddleware);

app.use('/points', pointsRouter);

// app.use(passport.initialize());
// app.use(passport.session());



app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  });