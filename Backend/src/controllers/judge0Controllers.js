const axios = require('axios');
const { writeDB, readDB, skipRead, countDocuments, updateDB } = require('../db/mongoOperations');
const jwt = require('jsonwebtoken');
const { updateLog } = require('../controllers/userInteration');
const e = require('express');

//create an axios instance
const instance = axios.create({
    baseURL: process.env.JUDGE0_URL,
});

function systemInfo(req, res) {
    //send a get request to the judge0 api
    instance.get("/system_info").then((response) => {
        res.status(200).json(response.data);
    }).catch((error) => {
        res.status(500).json(error);
    });
}

function configInfo(req, res) {
    instance.get("/config_info").then((response) => {
        res.status(200).json(response.data);
    }).catch((error) => {
        res.status(500).json(error);
    });
}

function statistics(req, res) {
    instance.get("/statistics").then((response) => {
        res.status(200).json(response.data);
    }).catch((error) => {
        res.status(500).json(error);
    });
}

function workers(req, res) {
    instance.get("/workers").then((response) => {
        res.status(200).json(response.data);
    }).catch((error) => {
        res.status(500).json(error);
    });
}

function fetchLanguages(req, res) {
    instance.get("/languages").then((response) => {
        res.status(200).json(response.data);
    }).catch((error) => {
        res.status(500).json(error);
    });
}

function createSubmission(req, res) {
    const data = {
        source_code: req.body.source_code,
        language_id: req.body.language_id,
        stdin: req.body.stdin,
        // expected_output: req.body.expected_output,
        // cpu_time_limit: req.body.cpu_time_limit,
        // cpu_extra_time: req.body.cpu_extra_time,
        // wall_time_limit: req.body.wall_time_limit,
        // memory_limit: req.body.memory_limit,
        // stack_limit: req.body.stack_limit,
        // max_processes_and_or_threads: req.body.max_processes_and_or_threads,
        // enable_per_process_and_thread_time_limit: req.body.enable_per_process_and_thread_time_limit,
        // enable_per_process_and_thread_memory_limit: req.body.enable_per_process_and_thread_memory_limit,
        // max_file_size: req.body.max_file_size,
        // number_of_runs: req.body.number_of_runs,
        // callback_url: req.body.callback_url,
        // compile: req.body.compile,
        // save: req.body.save
    };
    console.log(data);

    

    instance.post("/submissions/?base64_encoded=false&wait=false", data).then((response) => {

        // decoding the JWT token to get the email of the requester
        const decodedToken = jwt.decode(req.headers.authorization);

        updateLog(req, `Created a new submission <a href="/submission/${decodedToken.email}/${response.data.token}">View Submission</a>`);        

        writeDB("Main", "Submissions", {
            email: decodedToken.email,
            source_code: req.body.source_code,
            stdin: req.body.stdin,
            language_id: req.body.language_id,
            token: response.data.token,
            created_at: Date.now(), // submission created at
        });

        res.status(200).json(response.data);
    }).catch((error) => {
        console.log("Error in createSubmission: ");
        console.log(error);
        res.status(500).json(error);
    });
}

async function fetchSubmission(req, res) {

    const email = req.params.email;
    const submissionToken = req.params.submissionToken;

    updateLog(req, `Fetched <a href="/submission/${email}/${submissionToken}">Submission</a> for <a href="/profile/${email}">${email}</a>`);

    let isUpdated = await isSubmissionAlreadyUpdated(submissionToken, email);

    if (isUpdated === null) {
        console.log("Submission not found");
        res.status(404).json({ message: "Submission not found" });
    } else if (isUpdated === false) {
        //if the submission is fetched first time, then update the submission with the result from the compiler
        console.log("Submission not updated yet");
        await UpdateSubmissionWithCompilerResult(submissionToken, email);
        const updatedSubmission = await readDB("Main", "Submissions", { email: email, token: submissionToken });
        res.status(200).json(updatedSubmission[0]);
    }
    else {
        res.status(200).json(isUpdated);
    }
}

async function isSubmissionAlreadyUpdated(submissionToken, email) {
    try {

        let dbResponse = await readDB("Main", "Submissions", {
            email: email,
            token: submissionToken,
        });

        if (dbResponse.length === 0) {
            console.log("No submission found with the token");
            return null;
        }

        if (dbResponse[0].stdout) {
            console.log("Submission already updated");
            return dbResponse[0];
        }

        return false;

    } catch (error) {
        console.log("Error in Reading DB for checking if submission is already updated");
        console.log(error);
        return null;
    }
}

async function UpdateSubmissionWithCompilerResult(submissionToken, email) {

    try {
        const responsefromCompiler = await instance.get(`/submissions/${submissionToken}`);
        const submissionData = responsefromCompiler.data;
        console.log("Submission Data: ", submissionData);
        await updateDB("Main", "Submissions", { email: email, token: submissionToken }, { $set: submissionData });
    } catch (error) {
        console.log("Error in updating submission with result, because compiler don't have the result");
    }
}

async function fetchSubmissions(req, res) {

    console.log(req.params.email);
    console.log(req.params.maxEntriesPerPage);
    console.log(req.params.pageNumber);

    updateLog(req, `Fetched submissions for <a href="/profile/${req.params.email}">${req.params.email}</a>`);


    if (!req.params.email) {
        res.status(400).json({ message: "Email is required" });
        return;
    }

    if (!req.params.maxEntriesPerPage || isNaN(req.params.maxEntriesPerPage)) {
        res.status(400).json({ message: "maxEntriesPerPage is required" });
        return;
    }

    if (!req.params.pageNumber || isNaN(req.params.pageNumber)) {
        res.status(400).json({ message: "pageNumber is required" });
        return;
    }

    try {
        const languages = (await instance.get("/languages")).data;
        // console.log(languages);

        let projection = {
            token: 1,
            language_id: 1,
            created_at: 1,
        };

        let query = {
            email: req.params.email,
        };

        let maxEntriesPerPage = Math.max(Math.min(Number(req.params.maxEntriesPerPage), 100), 1) //Clamping the maxEntriesPerPage between 1 and 100
        let NoOfEntries = await countDocuments("Main", "Submissions", query) //Counting the number of entries in the database that match the query
        let TotalPages = Math.ceil(NoOfEntries / parseInt(maxEntriesPerPage)); //Calculating the total number of pages
        var curPage = Math.max(Math.min(Number(parseInt(req.params.pageNumber)), TotalPages), 1) //Clamping the page number between 1 and TotalPages
        const entriesToSkip = (parseInt(curPage) - 1) * parseInt(maxEntriesPerPage);    // calculate the number of entries to skip

        console.log("TotalPages: ", TotalPages);
        console.log("curPage: ", curPage);
        console.log("maxEntriesPerPage: ", maxEntriesPerPage);

        //fetch all submissions of the user from the database and sort them in descending order of created_at so that the latest submission comes first in the array


        const submissions = (await skipRead("Main", "Submissions", query, projection, { created_at: -1 }, entriesToSkip, parseInt(maxEntriesPerPage)));
        // console.log(submissions);

        //iterate over all submissions and add the language name to the submission
        submissions.forEach((submission) => {
            languages.forEach((language) => {
                if (submission.language_id === language.id) {
                    submission.language_name = language.name;
                }
            });
        });

        let response = {
            submissions: submissions,
            totalPages: TotalPages,
            totalEntries: NoOfEntries
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }


}

module.exports = { systemInfo, configInfo, statistics, workers, fetchLanguages, createSubmission, fetchSubmission, fetchSubmissions };