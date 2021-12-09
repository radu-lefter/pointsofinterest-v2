function authMiddleware(req, res, next) {
    if(["POST", "DELETE"].indexOf(req.method) == -1) {
        next();
    } else {
        if(req.session.username) { 
            next();
        } else {
            console.log(req.session);
            res.status(401).json({message: "You need to log in to perform that action!"});
        }
    }
}

module.exports = authMiddleware;