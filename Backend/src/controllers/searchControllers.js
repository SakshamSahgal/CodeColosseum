const { readDB } = require("../db/mongoOperations.js");
const { updateLog } = require("../controllers/userInteration.js");

async function getSearchResults(req, res) {
    const { search } = req.params;
    console.log("asas");
    updateLog(req, `searched With Query ${search}`);

    // Query to search in both name and email fields
    // Query to search in both name and email fields
    const query = {
        $or: [
            { name: { $regex: search, $options: "i" } }, // Case-insensitive search in name
            { email: { $regex: search, $options: "i" } }, // Case-insensitive search in email
        ],
    };

    const projection = { email: 1, name: 1, picture: 1 }; // Only return email and name fields

    try {
        const users = await readDB("Main", "Users", query, projection); // Use your DB and collection names
        res.status(200).send(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });
    }

}

module.exports = { getSearchResults };