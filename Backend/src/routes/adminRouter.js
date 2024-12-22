const router = require('express').Router();
const { systemInfo, configInfo, statistics, workers } = require("../controllers/judge0Controllers");


router.get("/systemInfo", systemInfo);
router.get("/configInfo", configInfo);
router.get("/statistics", statistics);
router.get("/workers", workers);

module.exports = router;