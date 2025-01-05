const { readDB } = require("../db/mongoOperations.js");
const { updateLog } = require("../controllers/userInteration.js");

async function getSearchResults(req, res) {
    const { search } = req.params;
    updateLog(req, `searched With Query ${search}`);

    try {

        // Query to search in both name and email fields
        // Query to search in both name and email fields
        const query = {
            $or: [
                { name: { $regex: search, $options: "i" } }, // Case-insensitive search in name
                { email: { $regex: search, $options: "i" } }, // Case-insensitive search in email
            ],
        };

        const projection = { email: 1, name: 1, picture: 1 }; // Only return email and name fields

        const users = await readDB("Main", "Users", query, projection); // Use your DB and collection names
        if (users.length === 0) {
            res.status(404).json({
                heading: "No Results",
                message: "the void holds no answer in its shadows."
            });
            return;
        }
        res.status(200).send(users);
    } catch (error) {
        res.status(500).json({
            heading: "Syntax fractured",
            message: "your query is a malformed whisper in the dark."
        });
    }

}

module.exports = { getSearchResults };