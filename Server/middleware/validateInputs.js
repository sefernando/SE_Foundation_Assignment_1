const { validationResult, check } = require("express-validator");

//request input validation patterns
const signupValidation = [
  check("userName").isLength({ min: 4 }),
  check("email").isEmail(),
  check("password").matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/
  ),
];

//validate inputs
const validateInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: "Invalid inputs", errors_list: errors.array() });
  }
  next();
};

module.exports = { validateInputs, signupValidation };
