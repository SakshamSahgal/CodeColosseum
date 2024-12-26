const router = require('express').Router();
const { fetchLanguages, createSubmission, fetchSubmission, fetchAllSubmissions } = require("../controllers/judge0Controllers");

router.get("/languages", fetchLanguages);
///submissions/?base64_encoded=false&wait=false

router.post("/createSubmission", createSubmission);
router.get("/allSubmissions/:email", fetchAllSubmissions);
router.get("/submission/:email/:submissionToken", fetchSubmission);
module.exports = router;