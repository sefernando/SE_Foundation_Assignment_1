const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  getUser,
  changeAccStatus,
  changeEmail,
  changePassword,
} = require("../service/userService");

// routes--------------------------------------------------------
router.get("/getUser/:userName", getUser);
router.put("/changePassword", auth, changePassword); //
router.put("/changeEmail", auth, changeEmail);
router.put("/changeAccStatus", auth, changeAccStatus);

module.exports = router;
