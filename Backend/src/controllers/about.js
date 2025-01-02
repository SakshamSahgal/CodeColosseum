
const { readDB } = require("../db/mongoOperations.js");
const { updateLog } = require("./userInteration.js");

async function about(req, res) {

    updateLog(req, `About page visited`);

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
