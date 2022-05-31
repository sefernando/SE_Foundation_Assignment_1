const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  getUser,
  changeAccStatus,
  changeEmail,
  changePassword,
  addToGroup,
} = require("../service/userService");

// routes--------------------------------------------------------
router.get("/getUser/:userName", getUser);
router.put("/changePassword", auth, changePassword); //
router.put("/changeEmail", auth, changeEmail);
router.put("/changeAccStatus", auth, changeAccStatus);
router.put("/addToGroup", auth, addToGroup);

module.exports = router;
