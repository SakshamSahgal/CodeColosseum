const { skipRead, countDocuments } = require('../db/mongoOperations.js');

async function UserActivity(req,res) {

    console.log(req.params.maxEntriesPerPage);
    console.log(req.params.pageNumber);

    if (!req.params.maxEntriesPerPage || isNaN(req.params.maxEntriesPerPage)) {
        res.status(400).json({ message: "maxEntriesPerPage is required" });
        return;
    }

    if (!req.params.pageNumber || isNaN(req.params.pageNumber)) {
        res.status(400).json({ message: "pageNumber is required" });
        return;
    }

    try {

        let maxEntriesPerPage = Math.max(Math.min(Number(req.params.maxEntriesPerPage), 100), 1) //Clamping the maxEntriesPerPage between 1 and 100
        let NoOfEntries = await countDocuments("Main", "Users", {}) //Counting the number of entries in the database
        let TotalPages = Math.ceil(NoOfEntries / parseInt(maxEntriesPerPage)); //Calculating the total number of pages
        var curPage = Math.max(Math.min(Number(req.params.pageNumber), TotalPages), 1) //Clamping the page number between 1 and TotalPages
        const entriesToSkip = (parseInt(curPage) - 1) * parseInt(maxEntriesPerPage);    // calculate the number of entries to skip

        console.log("TotalPages: ", TotalPages);
        console.log("curPage: ", curPage);
        console.log("maxEntriesPerPage: ", maxEntriesPerPage);

        const users = (await skipRead("Main", "Users", {}, {}, { LastVisited: -1 }, entriesToSkip, parseInt(maxEntriesPerPage)));

        let response = {
            users: users,
            totalPages: TotalPages,
            totalEntries: NoOfEntries
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { UserActivity };