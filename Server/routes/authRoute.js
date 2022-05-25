const express = require("express");
const router = express.Router();
const { signUp, signIn, checkUserName } = require("../service/authService");
const { check, validationResult } = require("express-validator");

//request input validation patterns
const signupValidation = [
  check("userName").isLength({ min: 4 }),
  check("email").isEmail(),
  check("password").matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/
  ),
];

//validate inputs
function validateInputs(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// routes--------------------------------------------------------
router.post("/signup", signupValidation, validateInputs, signUp);
router.post("/signin", signIn);
router.get("/checkUserName/:userName", checkUserName);

module.exports = router;
