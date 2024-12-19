const router = require('express').Router();
const { systemInfo, configInfo } = require("../controllers/judge0Controllers");


router.get("/systemInfo", systemInfo);
router.get("/configInfo", configInfo);

module.exports = router;