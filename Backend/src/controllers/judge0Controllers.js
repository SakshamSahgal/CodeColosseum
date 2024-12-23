const axios = require('axios');

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

module.exports = { systemInfo, configInfo, statistics, workers };