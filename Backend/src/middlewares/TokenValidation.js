const jwt = require('jsonwebtoken');

function isAdmin(req, res, next) {
    console.log(`Checking if user is admin`);
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
            res.status(403).send("Forbidden, not an admin");
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
    console.log(`checking if token is valid : ${token}`);
    try {
        const verifyResponse = jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = { isAdmin, isUser };