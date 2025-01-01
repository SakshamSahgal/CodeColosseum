
const { readDB } = require("../db/mongoOperations.js");

async function about(req, res) {
    try {
        const response = await readDB("PlaceHolder", "About", {}, { _id: 0 });
        res.status(200).send(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { about }
