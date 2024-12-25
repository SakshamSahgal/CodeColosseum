const router = require('express').Router();
const { fetchLanguages, createSubmission, fetchSubmission } = require("../controllers/judge0Controllers");

router.get("/languages", fetchLanguages);
///submissions/?base64_encoded=false&wait=false

router.post("/createSubmission", createSubmission);


module.exports = router;