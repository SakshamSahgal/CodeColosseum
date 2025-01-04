const router = require('express').Router();
const { getSearchResults } = require("../controllers/searchControllers.js");
const { ValidateSearchResultQuery } = require("../middlewares/ParameterValidation.js");


router.get("/users/:search", ValidateSearchResultQuery, getSearchResults);

module.exports = router;