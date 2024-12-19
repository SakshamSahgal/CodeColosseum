const router = require('express').Router();
const { GoogleLogin } = require('../controllers/authController');


router.get("/google", GoogleLogin);

module.exports = router;