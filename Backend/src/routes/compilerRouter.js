const router = require('express').Router();
const { fetchLanguages, createSubmission, fetchSubmission, fetchAllSubmissions } = require("../controllers/judge0Controllers");

router.get("/languages", fetchLanguages);
///submissions/?base64_encoded=false&wait=false

router.post("/createSubmission", createSubmission);
router.get("/submissions/:submissionToken", fetchSubmission);
router.get("/allSubmissions/:email", fetchAllSubmissions);

module.exports = router;