const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { check, validationResult } = require("express-validator");

//request input validation patterns
const signupValidation = [
  check("userName").isLength({ min: 4 }),
  check("email").isEmail(),
  check("password").matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/
  ),
];

//-----------------signup route-----------------------
router.post("/signup", signupValidation, async (req, res) => {
  //validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //check if the user already exist
  const existingUser = await User.findOne({ where: { email: req.body.email } });
  if (existingUser !== null) {
    return res
      .status(400)
      .json({ errors: [{ msg: "user is already registered" }] });
  }

  res.send(req.body.password);
});

//test comment

module.exports = router;
