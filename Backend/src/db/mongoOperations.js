const { MongoClient, ServerApiVersion } = require('mongodb'); //including the mongoDB package

let mongoURI = 'mongodb+srv://' + (process.env.DBUsername) + ':' + (process.env.DBPassword) + '@' + (process.env.ClusterAddress) + '/'; //URI for the MongoDB database

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true, //generate errors when deprecated MongoDB features are used
    }
});

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error:", error);
        throw error; // Rethrow the error for the caller to handle
    }
}


async function writeDB(Database, Collection, Data) { //Create Entry
    try {
        const db = client.db(Database);
        const collection = db.collection(Collection);

        const result = await collection.insertOne(Data);

        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error; // Rethrow the error for the caller to handle
    }
}

async function readDB(Database, Collection, Query, projection = {}) { //Read Entry
    try {
        const db = client.db(Database);
        const collection = db.collection(Collection);
        const result = await collection.find(Query).project(projection).toArray();
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error; // Rethrow the error for the caller to handle
    }
}

async function skipRead(Database, Collection, Query, projection, sortQuery, Skip, Limit) { //Read Entry
    try {
        const db = client.db(Database);
        const collection = db.collection(Collection);

        const result = await collection.find(Query).project(projection).sort(sortQuery).skip(Skip).limit(Limit).toArray();
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error; // Rethrow the error for the caller to handle
    }
}

async function updateDB(Database, Collection, FindQuery, UpdateQuery) { //Update Entry
    try {
        const db = client.db(Database);
        const collection = db.collection(Collection);

        const result = await collection.updateOne(FindQuery, UpdateQuery);

        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error; // Rethrow the error for the caller to handle
    }
}

async function deleteDB(Database, Collection, Query) { //Delete Entry
    try {
        const db = client.db(Database);
        const collection = db.collection(Collection);

        const result = await collection.deleteMany(Query);

        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error; // Rethrow the error for the caller to handle
    }
}

async function countDocuments(Database, Collection, Query) { //Count Entries
    try {
        const db = client.db(Database);
        const collection = db.collection(Collection);

        const result = await collection.countDocuments(Query);

        return result;

    } catch (error) {
        console.error("Error:", error);
        throw error; // Rethrow the error for the caller to handle
    }
}

module.exports = { connectDB, writeDB, readDB, updateDB, deleteDB, skipRead, countDocuments };