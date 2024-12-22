

function systemInfo(req, res) {
    //wait for 3 seconds
    setTimeout(() => {
        res.status(200).json("System Info");
    }, 3000);
}

function configInfo(req, res) {
    setTimeout(() => {
        res.status(200).json("Config Info");
    }, 3000);
}

function statistics(req, res) {
    setTimeout(() => {
        res.status(200).json("Statistics");
    }, 3000);
}

function workers(req, res) {
    setTimeout(() => {
        res.status(200).json("Workers");
    }, 3000);
}

module.exports = { systemInfo, configInfo, statistics, workers };