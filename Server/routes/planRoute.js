const express = require("express");
const router = express.Router();

const { createPlan, getAllPlans } = require("../service/planService");

router.get("/all", getAllPlans);
router.post("/create/:acronym", createPlan);

module.exports = router;
