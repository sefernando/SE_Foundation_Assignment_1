const { Application, Plan } = require("../models");

//////////////////////////////////////////////////////////////
//create plan -------------------------------------
async function createPlan(req, res) {
  const { acronym } = req.params;
  const { mvpName, startDate, endDate } = req.body;

  const appObj = {
    mvpName,
    startDate,
    endDate,
  };

  const app = await Application.findByPk(acronym);

  if (!app) {
    return res.status(400).json({ msg: "Cannot find the application" });
  }

  //checking if the user is a lead
  // if (!isLead) {
  //   return res
  //     .status(400)
  //     .json({ msg: "not authorized to create an application" });
  // }

  //saving app to the database
  try {
    const plan = await app.createPlan(appObj);
    return res.status(200).json({ plan });
  } catch (error) {
    if (error.name == "SequelizeUniqueConstraintError") {
      return res.status(400).json({ msg: "plan MVP name already exist" });
    } else {
      return res.status(500).json({ msg: "server error" });
    }
  }
}

//////////////////////////////////////////////////////////////
//get all plan names -------------------------------------
async function getAllPlans(req, res) {
  try {
    const plans = await Plan.findAll();
    res.status(200).json({ plans });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
}

//-----------------------------------------------------------------------------------------
module.exports = { createPlan, getAllPlans };
