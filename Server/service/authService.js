const { User } = require("../models");

//signup ---------------------------------------
async function signUp(req, res) {
  //check if the user already exist
  const existingUser = await User.findOne({ where: { email: req.body.email } });
  if (existingUser !== null) {
    return res
      .status(400)
      .json({ errors: [{ msg: "user is already registered" }] });
  }

  res.send("sign up ok");
}

module.exports = { signUp };
