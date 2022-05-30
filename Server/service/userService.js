const { User } = require("../models");

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

// --------------------------------------------------------------------------
module.exports = { getUser };
