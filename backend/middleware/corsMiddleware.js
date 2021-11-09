function corsMiddleware(req, res, next) {
    res.set('Access-Control-Allow-Origin', "http://localhost:5500");
    res.set("Access-Control-Allow-Credentials", true);
    next();
}

module.exports = corsMiddleware;