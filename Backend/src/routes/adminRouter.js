const router = require('express').Router();
const { systemInfo, configInfo, statistics, workers } = require("../controllers/judge0Controllers");
const { users, userActivity } = require("../controllers/userInteration.js");
const { validateEmail, validatePageNumber, validateMaxEntriesPerPage } = require("../middlewares/ParameterValidation.js");

router.get("/systemInfo", systemInfo);
router.get("/configInfo", configInfo);
router.get("/statistics", statistics);
router.get("/workers", workers);
router.get("/users/:maxEntriesPerPage/:pageNumber", validateMaxEntriesPerPage, validatePageNumber, users);  //returns all users with pagination for admin analytics
router.get("/user/activity/:email/:maxEntriesPerPage/:pageNumber", validateEmail, validatePageNumber, validateMaxEntriesPerPage, userActivity); //returns all activity of a user with pagination for admin analytics
module.exports = router;