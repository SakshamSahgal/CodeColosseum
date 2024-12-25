const axios = require('axios');
const { writeDB, readDB } = require('../db/mongoOperations');
const jwt = require('jsonwebtoken');


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
        // stdin: req.body.stdin,
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

        // console.log(response.data);
        const decodedToken = jwt.decode(req.headers.authorization);

        writeDB("Main", "Submissions", {
            email: decodedToken.email,
            source_code: req.body.source_code,
            language_id: req.body.language_id,
            token: response.data.token,
            created_at: Date.now(), // submission created at
        });

        res.status(200).json(response.data);
    }).catch((error) => {
        res.status(500).json(error);
    });
}

function fetchSubmission(req, res) {
    const token = req.params.submissionToken;
    instance.get(`/submissions/${token}`).then((response) => {
        res.status(200).json(response.data);
    }).catch((error) => {
        res.status(500).json(error);
    });
}

function fetchAllSubmissions(req, res) {
    console.log(req.params.email);
    readDB("Main", "Submissions", {
        email: req.params.email,
    }).then((response) => {
        res.status(200).json(response);
    }).catch((error) => {
        res.status(500).json(error);
    });
}

module.exports = { systemInfo, configInfo, statistics, workers, fetchLanguages, createSubmission, fetchSubmission, fetchAllSubmissions };