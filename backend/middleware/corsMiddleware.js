require('dotenv').config();
const frontend = process.env.frontend

function corsMiddleware(req, res, next) {
    res.set('Access-Control-Allow-Origin', "*");
    res.set("Access-Control-Allow-Credentials", true);
    next();
}

module.exports = corsMiddleware;