const jwt = require('jsonwebtoken');

function isAdmin(req, res, next) {
    // console.log("checking if request is from admin");
    if (!req.headers.authorization) {
        res.status(401).send("Unauthorized, no token provided");
    }
    else if (!isValidToken(req.headers.authorization)) {
        res.status(401).send("Unauthorized, invalid token");
    } else {
        const token = req.headers.authorization;
        const decodedToken = jwt.decode(token);
        console.log(decodedToken);
        if (decodedToken.email == process.env.ADMIN_EMAIL) {
            next();
        } else {
            res.status(401).send("Unauthorized, not an admin");
        }
    }
}

function isUser(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send("Unauthorized, no token provided");
    }
    else if (!isValidToken(req.headers.authorization)) {
        res.status(401).send("Unauthorized, invalid token");
    } else {
        next();
    }
}

function isValidToken(token) {
    try {
        jwt.verify(token, process.env.SECRET);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = { isAdmin, isUser };