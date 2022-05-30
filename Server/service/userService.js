const { User } = require("../models");
const bcryptjs = require("bcryptjs");
// const { Op } = require("sequelize");
// const jwt = require("jsonwebtoken");

/////////////////////////////////////////////////////////////////////////////
//get user --------------------------------------------------------------
async function getUser(req, res) {
  const userName = req.params.userName;

  try {
    const user = await User.findByPk(userName);
    if (user) {
      res.status(200).json({
        ...user.dataValues,
        password: "*******",
        userName: user.dataValues.user_name,
      });
    } else {
      res.status(400).json({ error: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "server error" });
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

////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////
//disable user --------------------------------------------------------
async function changeAccStatus(req, res) {
  const { userName, isActive } = req.body;

  // const isAdmin = groups.includes("admin");

  // if (!isAdmin) {
  //   res.status(401).json({ error: "Unauthorized" });
  // }
  console.log("username", userName);

  const user = await User.update(
    { isActive: isActive },
    { where: { user_name: userName } }
  );

  if (user[0] === 0) {
    res.status(500).json({ error: "user not found" });
  } else {
    res.status(200).json({ msg: "successfully changed the status" });
  }
}

// --------------------------------------------------------------------------
module.exports = { getUser, changeEmail, changePassword, changeAccStatus };
