const express = require("express");
const router = express.Router();

const {
  createTaskByApp,
  createTaskByPlan,
  addNotes,
} = require("../service/taskService");

router.post("/create/:acronym", createTaskByApp);
router.post("/create/:acronym/:mvpName", createTaskByPlan);
router.put("/addNotes/:taskName", addNotes);

module.exports = router;
