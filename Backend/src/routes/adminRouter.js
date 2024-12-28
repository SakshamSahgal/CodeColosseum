const router = require('express').Router();
const { systemInfo, configInfo, statistics, workers } = require("../controllers/judge0Controllers");
const { UserActivity } = require("../controllers/UserActivity");

router.get("/systemInfo", systemInfo);
router.get("/configInfo", configInfo);
router.get("/statistics", statistics);
router.get("/workers", workers);
router.get("/users/:maxEntriesPerPage/:pageNumber", UserActivity);

module.exports = router;