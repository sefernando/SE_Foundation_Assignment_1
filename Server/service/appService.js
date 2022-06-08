const { Application } = require("../models");

//////////////////////////////////////////////////////////////
//get app by acronym -------------------------------------
async function getApp(req, res) {
  try {
    const acronym = req.params.acronym;

    const app = await Application.findByPk(acronym);
    return res.status(200).json({ app });
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
}

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
    // isLead,
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

//////////////////////////////////////////////////////////////
//edit application -------------------------------------
async function editApp(req, res) {
  const { acronym } = req.params;

  const {
    isLead,
    description,
    startDate,
    endDate,
    permitCreate,
    permitOpen,
    permitToDoList,
    permitDoing,
    permitDone,
  } = req.body;

  const appUpdateObj = {
    description,
    startDate,
    endDate,
    permitCreate,
    permitOpen,
    permitToDoList,
    permitDoing,
    permitDone,
  };

  console.log("data", appUpdateObj);

  //checking if the user is a lead
  if (!isLead) {
    return res
      .status(400)
      .json({ msg: "not authorized to create an application" });
  }

  //updating application date
  try {
    const updatedApp = await Application.update(appUpdateObj, {
      where: { acronym },
    });

    if (updatedApp[0] === 0) {
      res.status(400).json({ error: "App not found" });
    } else {
      res.status(200).json({ msg: "Application updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { createApp, getAllApps, editApp, getApp };
