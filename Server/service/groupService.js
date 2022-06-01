const { Group } = require("../models");

//////////////////////////////////////////////////////////////
//create group function -------------------------------------
async function createGroup(req, res) {
  const { userName, groupName } = req.body;

  const existingGroup = await Group.findOne({ where: { groupName } });
  if (existingGroup) {
    return res.status(400).json({ error: "Group name already exists" });
  }

  const group = await Group.create({ groupName });

  if (!group) {
    return res.status(500).json({ error: "Server error" });
  }

  res.status(200).json({ msg: "Group updated successfully", response: group });
}

//////////////////////////////////////////////////////////////
//ge all groups function -------------------------------------
async function getAllGroups(req, res) {
  try {
    const allGroups = await Group.findAll({ attributes: ["groupName"] });

    if (!allGroups) {
      return res.status(400).json({ error: "No groups are available" });
    } else {
      const groups = allGroups.map((group) => group.groupName);
      return res.status(200).json({ groups });
    }
  } catch (error) {
    console.log(error.message);
  }
}

//////////////////////////////////////////////////////////////
//check if group name available-------------------------------
async function checkGroup(req, res) {
  try {
    const groupName = req.query.groupName;
    console.log("gn", groupName);
    const group = await Group.findOne({ where: { groupName } });

    if (group) {
      res.status(200).json({ msg: "group available" });
    } else {
      res.status(404).json({ msg: "group cannot find" });
    }
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
}

//---------------------------------------------------------------------------
module.exports = { createGroup, getAllGroups, checkGroup };
