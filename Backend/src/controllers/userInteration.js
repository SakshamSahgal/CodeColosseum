const { readDB, writeDB, updateDB, skipRead, countDocuments } = require("../db/mongoOperations.js");
const { getBrowser, getOS, getDeviceType, getUserLocation } = require("../controllers/analytics.js");
const jwt = require('jsonwebtoken');

async function captureAccount(email, name, picture) {

    //check if the user is already in the database
    const user = await readDB("Main", "Users", { email: email });
    if (user.length === 0) {
        console.log("Yaay! New user, adding to database");
        //if the user is not in the database, add the user to the database
        await writeDB("Main", "Users", {
            email: email,
            name: name,
            picture: picture,
            LastVisited: new Date()
        });
    } else {
        //if the user is already in the database, update the last visited date
        await updateDB("Main", "Users", { email: email }, { $set: { LastVisited: new Date() } });
    }

    return;
}

async function users(req, res) {

    console.log(req.params.maxEntriesPerPage);
    console.log(req.params.pageNumber);

    try {

        let maxEntriesPerPage = Math.max(Math.min(Number(req.params.maxEntriesPerPage), 100), 1) //Clamping the maxEntriesPerPage between 1 and 100
        let NoOfEntries = await countDocuments("Main", "Users", {}) //Counting the number of entries in the database
        let TotalPages = Math.ceil(NoOfEntries / parseInt(maxEntriesPerPage)); //Calculating the total number of pages
        var curPage = Math.max(Math.min(Number(req.params.pageNumber), TotalPages), 1) //Clamping the page number between 1 and TotalPages
        const entriesToSkip = (parseInt(curPage) - 1) * parseInt(maxEntriesPerPage);    //calculate the number of entries to skip

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

async function updateLog(req, log) {
    try {

        let AuthToken = req.headers.authorization;
        const decodedToken = jwt.decode(AuthToken);
        // console.log(decodedToken);

        let userLog = {
            email: decodedToken.email,
            timeStamp: new Date(),
            browserInfo: getBrowser(req.useragent.browser),
            osInfo: getOS(req.useragent),
            ip: req.ip,
            deviceTypeInfo: getDeviceType(req.useragent),
            locationData: await getUserLocation(req.ip),
            log: log
        }

        // console.log(userLog);

        await writeDB("Main", "UserLogs", userLog);
    }
    catch (error) {
        console.log(error);
    }
}

async function userActivity(req, res) {

    console.log("User Activity");
    console.log(req.params.maxEntriesPerPage);
    console.log(req.params.pageNumber);
    console.log(req.params.email);

    try {
        let query = { email: req.params.email };
        let maxEntriesPerPage = Math.max(Math.min(Number(req.params.maxEntriesPerPage), 100), 1) //Clamping the maxEntriesPerPage between 1 and 100
        let NoOfEntries = await countDocuments("Main", "UserLogs", query) //Counting the number of entries in the database
        let TotalPages = Math.ceil(NoOfEntries / parseInt(maxEntriesPerPage)); //Calculating the total number of pages
        var curPage = Math.max(Math.min(Number(req.params.pageNumber), TotalPages), 1) //Clamping the page number between 1 and TotalPages
        const entriesToSkip = (parseInt(curPage) - 1) * parseInt(maxEntriesPerPage);    //calculate the number of entries to skip

        console.log("TotalPages: ", TotalPages);
        console.log("curPage: ", curPage);
        console.log("maxEntriesPerPage: ", maxEntriesPerPage);

        const userLogs = (await skipRead("Main", "UserLogs", { email: req.params.email }, {}, { timeStamp: -1 }, entriesToSkip, parseInt(maxEntriesPerPage)));

        let response = {
            userLogs: userLogs,
            totalPages: TotalPages,
            totalEntries: NoOfEntries
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }

}


module.exports = { captureAccount, users, updateLog, userActivity };