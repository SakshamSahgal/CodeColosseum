const jwt = require("jsonwebtoken");
const { updateDB } = require("../db/mongoOperations.js");

async function updateActivity(req, res, next) {
    try {
        let JWTtoken = req.headers.authorization;
        const verifyResponse = jwt.verify(JWTtoken, process.env.JWT_SECRET); //check if the token is valid
        const { email } = verifyResponse;
        await updateDB("Main", "Users", { email: email }, { $set: { LastVisited: new Date() } });
        console.log(`Last Activity for ${email} updated at ${new Date()}`);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).send("Unauthorized, invalid token");
    }
}

module.exports = { updateActivity };
