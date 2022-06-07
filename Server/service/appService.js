const { Application } = require("../models");

//////////////////////////////////////////////////////////////
//get all application -------------------------------------
async function getAllApps(req, res) {
  try {
    const apps = await Application.findAll();
    return res.status(200).json({ apps });
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
}

//////////////////////////////////////////////////////////////
//create application -------------------------------------
async function createApp(req, res) {
  let app;

  const {
    isLead,
    acronym,
    description,
    startDate,
    endDate,
    permitCreate,
    permitOpen,
    permitToDoList,
    permitDoing,
    permitDone,
  } = req.body;

  const appObj = {
    isLead,
    acronym,
    description,
    startDate,
    endDate,
    permitCreate,
    permitOpen,
    permitToDoList,
    permitDoing,
    permitDone,
  };

  //checking if the user is a lead
  if (!isLead) {
    return res
      .status(400)
      .json({ msg: "not authorized to create an application" });
  }

  //saving app to the database
  try {
    app = await Application.create(appObj);
  } catch (error) {
    if (error.name == "SequelizeUniqueConstraintError") {
      return res.status(400).json({ msg: "app acronym already exist" });
    } else {
      return res.status(500).json({ msg: "server error" });
    }
  }

  res.status(200).json({ app });
}

module.exports = { createApp, getAllApps };
