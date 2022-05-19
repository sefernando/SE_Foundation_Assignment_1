const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

//request input validation patterns
const signupValidation = [
  check("userName").isLength({ min: 4 }),
  check("email").isEmail(),
  check("password").matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/
  ),
];

//signup route
router.post("/signup", signupValidation, async (req, res) => {
  console.log(req.body.email);
  //validate inputs
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.send("sign up");
});

//test comment

module.exports = router;
