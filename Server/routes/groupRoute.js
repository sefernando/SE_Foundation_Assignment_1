const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  createGroup,
  getAllGroups,
  checkGroupName,
  checkGroup,
} = require("../service/groupService");

// routes--------------------------------------------------------
router.post("/createGroup", createGroup);
router.get("/getAllGroups", getAllGroups);
router.get("/check", checkGroupName);
router.get("/checkGroup", checkGroup);

module.exports = router;
