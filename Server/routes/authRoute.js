const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  signUp,
  signIn,
  checkUserName,
  changePassword,
  changeEmail,
  disableUser,
} = require("../service/authService");

const auth = require("../middleware/auth");
const {
  validateInputs,
  signupValidation,
} = require("../middleware/validateInputs");

// routes--------------------------------------------------------
router.post("/signup", signupValidation, validateInputs, signUp);
router.post("/signin", signIn);
router.get("/checkUserName/:userName", checkUserName);
// router.put("/changePassword", auth, changePassword); //
// router.put("/changeEmail", auth, changeEmail);
// router.put("/disableUser", auth, disableUser);

module.exports = router;

//request input validation patterns
// const signupValidation = [
//   check("userName").isLength({ min: 4 }),
//   check("email").isEmail(),
//   check("password").matches(
//     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/
//   ),
// ];

//validate inputs
// function validateInputs(req, res, next) {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// }
