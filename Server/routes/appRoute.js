const express = require("express");
const router = express.Router();

const {
  createApp,
  getAllApps,
  editApp,
  getApp,
} = require("../service/appService");

router.get("/all", getAllApps);
router.get("/:acronym", getApp);
router.post("/createApp", createApp);
router.put("/editApp/:acronym", editApp);

module.exports = router;
