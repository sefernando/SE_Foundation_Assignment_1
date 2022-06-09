const { User, Group } = require("../models");
const bcryptjs = require("bcryptjs");
// const { Op } = require("sequelize");
// const jwt = require("jsonwebtoken");

/////////////////////////////////////////////////////////////////////////////
//get user --------------------------------------------------------------
async function getUser(req, res) {
  const userName = req.params.userName;

  try {
    const user = await User.findOne({
      where: { userName },
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
    if (user) {
      console.log("get user", user);

      res.status(200).json({
        // ...user.dataValues,
        userName: user.dataValues.userName,
        email: user.dataValues.email,
        password: "*******",
        isActive: user.dataValues.isActive,
        groups: user.Groups.map((group) => group.groupName),
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
        where: { userName },
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
        where: { userName },
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

  const user = await User.update(
    { isActive: isActive },
    { where: { userName } }
  );

  if (user[0] === 0) {
    res.status(500).json({ error: "user not found" });
  } else {
    res.status(200).json({ msg: "successfully changed the status" });
  }
}

//////////////////////////////////////////////////////////////
//add to group function -------------------------------------
async function addToGroup(req, res) {
  let newUser;
  // const user = await User.findByPk(req.body.userName);
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
    return res.status(400).json({ error: "user not found" });
  }

  //check group function
  function checkGroup(userName, groupName) {
    if (userName === user.userName) {
      user.Groups.forEach((group) => {
        return group.groupName === groupName;
      });
    } else {
      return false;
    }
  }

  try {
    req.body.groups.forEach(async (groupName) => {
      const group = await Group.findOne({
        where: { groupName },
      });

      const userExistingGroups = checkGroup(req.body.userName, groupName);

      if (group && !userExistingGroups) {
        newUser = await user.addGroup(group);
      }
    });

    res.status(200).json({ msg: "Group successfully added" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

//////////////////////////////////////////////////////////////
//remove from group function -------------------------------------
async function removeFromGroup(req, res) {
  console.log("remove from groups iinside");
  let newUser;
  // const user = await User.findByPk(req.body.userName);
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
    return res.status(400).json({ error: "user not found" });
  }

  //check group function
  function checkGroup(userName, groupName) {
    if (userName === user.userName) {
      user.Groups.forEach((group) => {
        return group.groupName === groupName;
      });
    } else {
      return false;
    }
  }

  try {
    req.body.groups.forEach(async (groupName) => {
      const group = await Group.findOne({
        where: { groupName },
      });

      const userExistingGroups = checkGroup(req.body.userName, groupName);

      if (group && !userExistingGroups) {
        newUser = await user.removeGroup(group);
      }
    });

    res.status(200).json({ msg: "successfully removed from groups" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

//////////////////////////////////////////////////////////////
//get all users --------------------------------------------
async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: ["userName", "isActive"],
      // include: [
      //   {
      //     model: Group,
      //     // as: "groups",
      //     attributes: ["groupName"],
      //     through: {
      //       attributes: [],
      //     },
      //   },
      // ],
    });
    if (users) {
      // console.log("get user", users);

      res.status(200).json({ users });
    } else {
      res.status(400).json({ error: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
}

// --------------------------------------------------------------------------
module.exports = {
  getUser,
  getAllUsers,
  changeEmail,
  changePassword,
  changeAccStatus,
  addToGroup,
  removeFromGroup,
};
