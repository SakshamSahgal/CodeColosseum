const router = require('express').Router();
const { systemInfo, configInfo, statistics, workers } = require("../controllers/judge0Controllers");
const { users, userActivity } = require("../controllers/userInteration.js");

router.get("/systemInfo", systemInfo);
router.get("/configInfo", configInfo);
router.get("/statistics", statistics);
router.get("/workers", workers);
router.get("/users/:maxEntriesPerPage/:pageNumber", users);
router.get("/user/activity/:email/:maxEntriesPerPage/:pageNumber", userActivity);
module.exports = router;