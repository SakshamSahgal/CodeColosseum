const router = require('express').Router();
const { getProfile } = require("../controllers/profileControllers.js");

router.get("/:email", getProfile);

module.exports = router;