const router = require('express').Router();
const { about } = require('../controllers/about.js');


router.get("/about", about);

module.exports = router;