const mysql = require('mysql2');
const env = process.env;

const con = mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,});

con.connect( err=> {
    if(err) {
        console.log(err);
        process.exit(1); // exit the server
    } else { 
        console.log('connected to mysql ok');
    }
});
    
module.exports = con;