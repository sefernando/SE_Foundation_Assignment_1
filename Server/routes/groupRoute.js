const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { createGroup, getAllGroups } = require("../service/groupService");

// routes--------------------------------------------------------
router.post("/createGroup", auth, createGroup);
router.get("/getAllGroups", getAllGroups);

module.exports = router;
