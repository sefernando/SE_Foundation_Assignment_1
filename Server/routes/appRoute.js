const express = require("express");
const router = express.Router();

const { createApp, getAllApps } = require("../service/appService");

router.get("/all", getAllApps);
router.post("/createApp", createApp);

module.exports = router;
