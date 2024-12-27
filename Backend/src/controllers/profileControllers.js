const { readDB } = require("../db/mongoOperations.js");

async function getProfile(req, res) {
    console.log("Profile Controller");
    const email = req.params.email;
    console.log(email);
    const result = await readDB("Main", "Users", { email: email }, { _id: 0 });
    console.log(result);
    if (result.length === 0) {
        res.status(404).send("User not found");
    } else {
        res.status(200).send(result[0]);
    }
}

module.exports = { getProfile };