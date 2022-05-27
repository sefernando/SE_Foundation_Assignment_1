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
    return res.status(409).json({ error: "User is already registered" });
  }

  //hashing password
  const hashPassword = await bcryptjs.hash(pwd, saltRounds);

  //saving user to DB
  if (hashPassword) {
    user = await User.create({
      user_name: req.body.userName,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
    });
  } else {
    return res.status(500).json({ error: "password hashing error" });
  }

  //creating jwt token
  const payLoad = {
    userName: user.user_name,
    active: user.isActive,
    role: user.role,
  };

  jwt.sign(payLoad, privateKey, options, (err, token) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error occured while creating jwt token" });
    } else {
      return res.status(200).json({ msg: "Successfully registered", token });
    }
  });
}

/////////////////////////////////////////////////////////////////////////////
//signin ---------------------------------------------------------------------
async function signIn(req, res) {
  //checking the existing user
  const user = await User.findOne({ where: { user_name: req.body.userName } });
  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  //checking the password
  const isMatch = await bcryptjs.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  //creating and sending jwt token
  const payLoad = {
    userName: user.user_name,
    active: user.isActive,
    role: user.role,
  };

  jwt.sign(payLoad, privateKey, options, (err, token) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error occured while creating jwt token" });
    } else {
      return res.status(200).json({
        msg: "Login successfull",
        token,
        userName: user.user_name,
        role: user.role,
        active: user.isActive,
      });
    }
  });
}

/////////////////////////////////////////////////////////////////////////////
//check user name-----------------------------------------------------------
async function checkUserName(req, res) {
  const user = await User.findOne({
    where: { user_name: req.params.userName },
  });
  if (user) {
    return res.status(200).json({ user: user.user_name });
  } else {
    return res.status(200).json({ user: null });
  }
}

/////////////////////////////////////////////////////////////////////////////
//change password -----------------------------------------------------------
async function changePassword(req, res) {
  const saltRounds = 10;
  let hashPassword;
  const { userName, password } = req.body;

  const PWD_REGEX =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/;

  if (!PWD_REGEX.test(password)) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  //hashing password
  if (password) {
    hashPassword = await bcryptjs.hash(password, saltRounds);
  } else {
    return res.status(400).json({ error: "User not found" });
  }

  //updating database
  try {
    const updatedUser = await User.update(
      { password: hashPassword },
      {
        where: { user_name: userName },
      }
    );

    if (updatedUser[0] === 0) {
      res.status(500).json({ error: "User not found" });
    } else {
      res.status(200).json({ msg: "Password updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

/////////////////////////////////////////////////////////////////////////////
//change email --------------------------------------------------------
async function changeEmail(req, res) {
  const { userName, email } = req.body;

  try {
    console.log(userName, email);
    const updatedUser = await User.update(
      { email },
      {
        where: { user_name: userName },
      }
    );

    if (updatedUser[0] === 0) {
      res.status(500).json({ error: "user not found" });
    } else {
      res.status(200).json({ msg: "Email updated successfully" });
    }
  } catch (error) {
    console.log("reach catch");
    res.status(500).json({ error: "server error" });
  }
}

module.exports = {
  signUp,
  signIn,
  checkUserName,
  changePassword,
  changeEmail,
};
