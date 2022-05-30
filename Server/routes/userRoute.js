const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { getUser } = require("../service/userService");

// routes--------------------------------------------------------
// router.post("/signup", signupValidation, validateInputs, signUp);
router.get("/getUser/:userName", getUser);

module.exports = router;
