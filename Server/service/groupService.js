const { Group } = require("../models");

//////////////////////////////////////////////////////////////
//create group function -------------------------------------
async function createGroup(req, res) {
  const { userName, groupName } = req.body;
  if (userName !== "admin") {
    return res.status(401).json({ error: "Access denied" });
  }

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

//---------------------------------------------------------------------------
module.exports = { createGroup, getAllGroups };
