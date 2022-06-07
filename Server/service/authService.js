const { User, Group } = require("../models");
const bcryptjs = require("bcryptjs");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const privateKey = process.env.TOKEN_SECRET;
const options = { expiresIn: process.env.TOKEN_EXPIRE };

//////////////////////////////////////////////////////////////
//check if user is in a group --------------------------------
async function checkGroup(userName, groupName) {
  const user = await User.findOne({
    where: { userName },
    include: [
      {
        model: Group,
        attributes: ["groupName"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (!user) {
    return false;
  }

  const userGroups = user.Groups.map((x) => x.groupName);

  if (userGroups.includes(groupName)) {
    return true;
  } else {
    return false;
  }
}

/////////////////////////////////////////////////////////////////////////////
//signup ---------------------------------------------------------------------
async function signUp(req, res) {
  const saltRounds = 10;
  const pwd = req.body.password;
  let userWithGroup;

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email: req.body.email }, { userName: req.body.userName }],
    },
  });

  // if (userByEmail !== null || userByUserName !== null)
  if (existingUser !== null) {
    return res.status(409).json({ error: "User is already registered" });
  }

  //hashing password
  const hashPassword = await bcryptjs.hash(pwd, saltRounds);

  if (!hashPassword) {
    return res.status(500).json({ error: "password hashing error" });
  }

  //saving user to DB
  let user = await User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: hashPassword,
  });

  //saving associations
  req.body.groups.forEach(async (groupName) => {
    const group = await Group.findOne({
      where: { groupName },
    });

    if (group) {
      user = await user.addGroup(group);
    }
  });

  //fetching all data for the new user
  let newUser = await User.findOne({
    where: { userName: req.body.userName },
    include: [
      {
        model: Group,
        // as: "groups",
        attributes: ["groupName"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  //creating jwt token
  const payLoad = {
    userName: newUser.userName,
    active: newUser.isActive,
    groups: newUser.Groups.map((group) => group.groupName),
  };

  // console.log("payload", payLoad);
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
  const user = await User.findOne({
    where: { userName: req.body.userName },
    include: [
      {
        model: Group,
        // as: "groups",
        attributes: ["groupName"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  //checking the password
  const isMatch = await bcryptjs.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  //checking if the user is admin
  const isAdmin = await checkGroup(user.userName, "admin");

  //checking if the user is lead
  const isLead = await checkGroup(user.userName, "lead");

  //checking if the user is admin
  const isPM = await checkGroup(user.userName, "manager");

  //checking if the user is a team member
  const isTeamMember = await checkGroup(user.userName, "team_member");

  //creating and sending jwt token
  const payLoad = {
    userName: user.userName,
    email: user.email,
    active: user.isActive,
    groups: user.Groups.map((group) => group.groupName),
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
        userName: user.userName,
        email: user.email,
        active: user.isActive,
        isAdmin: isAdmin,
        isLead: isLead,
        isPM: isPM,
        isTeamMember: isTeamMember,
        groups: user.Groups.map((group) => group.groupName),
      });
    }
  });
}

/////////////////////////////////////////////////////////////////////////////
//check user name-----------------------------------------------------------
async function checkUserName(req, res) {
  const user = await User.findOne({
    where: { userName: req.params.userName },
  });
  if (user) {
    return res.status(200).json({ user: user.userName });
  } else {
    return res.status(200).json({ user: null });
  }
}

// < ---------------------------------------------->
module.exports = {
  signUp,
  signIn,
  checkUserName,
};
