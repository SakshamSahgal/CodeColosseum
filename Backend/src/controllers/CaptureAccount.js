const { readDB, writeDB, updateDB } = require("../db/mongoOperations.js");

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

module.exports = { captureAccount };