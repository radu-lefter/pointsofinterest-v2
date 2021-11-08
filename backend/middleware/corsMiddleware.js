function corsMiddleware(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    //res.header("Access-Control-Allow-Credentials", true);
    next();
}

module.exports = corsMiddleware;