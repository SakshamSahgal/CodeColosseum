const router = require('express').Router();
const { fetchLanguages, createSubmission, fetchSubmission, fetchSubmissions } = require("../controllers/judge0Controllers");
const { validateEmail, validatePageNumber, validateMaxEntriesPerPage } = require("../middlewares/ParameterValidation.js");

router.get("/languages", fetchLanguages);
///submissions/?base64_encoded=false&wait=false

router.post("/createSubmission", createSubmission);
router.get("/allSubmissions/:email/:maxEntriesPerPage/:pageNumber", validateEmail, validateMaxEntriesPerPage, validatePageNumber, fetchSubmissions);
router.get("/submission/:email/:submissionToken", validateEmail, fetchSubmission);

module.exports = router;