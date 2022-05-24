const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const privateKey = process.env.TOKEN_SECRET;
const options = { expiresIn: process.env.TOKEN_EXPIRE };

/////////////////////////////////////////////////////////////////////////////
//signup ---------------------------------------------------------------------
async function signUp(req, res) {
  const saltRounds = 10;
  const pwd = req.body.password;
  let user = null;

  //check if the user already exist
  // const userByEmail = await User.findOne({ where: { email: req.body.email } });
  // const userByUserName = await User.findOne({
  //   where: { user_name: req.body.userName },
  // });

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email: req.body.email }, { user_name: req.body.userName }],
    },
  });

  // if (userByEmail !== null || userByUserName !== null)
  if (existingUser !== null) {
    return res
      .status(400)
      .json({ errors: [{ msg: "user is already registered" }] });
  }

  //hashing password
  const hashPassword = await bcryptjs.hash(pwd, saltRounds);

  //saving user to DB
  if (hashPassword) {
    user = await User.create({
      user_name: req.body.userName,
      email: req.body.email,
      password: hashPassword,
    });
  } else {
    return res
      .status(500)
      .json({ errors: [{ msg: "password hashing error" }] });
  }

  //creating jwt token
  const payLoad = { userName: user.user_name, id: user.id };

  jwt.sign(payLoad, privateKey, options, (err, token) => {
    if (err) {
      return res
        .status(500)
        .json({ errors: [{ msg: "error occured while creating jwt token" }] });
    } else {
      return res.json({ token });
    }
  });
}

/////////////////////////////////////////////////////////////////////////////
//signin ---------------------------------------------------------------------
async function signIn(req, res) {
  //checking the existing user
  const user = await User.findOne({ where: { user_name: req.body.userName } });
  if (!user) {
    return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
  }

  //checking the password
  const isMatch = await bcryptjs.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
  }

  //creating and sending jwt token
  const payLoad = { userName: user.user_name, id: user.id };

  jwt.sign(payLoad, privateKey, options, (err, token) => {
    if (err) {
      return res
        .status(500)
        .json({ errors: [{ msg: "error occured while creating jwt token" }] });
    } else {
      return res.json({ token, userName: user.user_name, role: user.role });
    }
  });
}

module.exports = { signUp, signIn };
