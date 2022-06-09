const { Application, Plan, Task } = require("../models");
const plan = require("../models/plan");

//////////////////////////////////////////////////////////////
//create task by application-------------------------------------
async function createTaskByApp(req, res) {
  const { acronym } = req.params;
  const { name, description, notes, state, creator, owner, createDate } =
    req.body;

  const app = await Application.findByPk(acronym);

  if (!app) {
    return res.status(400).json({ msg: "Application not found" });
  }

  //creating the task id
  const rNumber = app.rNumber + 1;
  const id = `${app.acronym}_${rNumber}`;

  //updating the rNumber in applications
  const updatedApp = await app.update({ rNumber });

  //converting array of note data into a string
  noteString = notes.join(";");

  //creating a task
  const taskObj = {
    name,
    description,
    notes: noteString,
    id,
    state,
    creator,
    owner,
    createDate,
  };

  try {
    const task = await updatedApp.createTask(taskObj);
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
}

//////////////////////////////////////////////////////////////
//create task by application-------------------------------------
async function createTaskByPlan(req, res) {
  const { acronym, mvpName } = req.params;
  const { name, description, notes, state, creator, owner, createDate } =
    req.body;

  const app = await Application.findOne({
    include: [
      {
        model: Plan,
        where: { mvpName },
      },
    ],
  });

  if (!app || app.acronym !== acronym) {
    return res
      .status(400)
      .json({ msg: "Application or Plan not found or Invalid data" });
  }

  //creating the task id
  const rNumber = app.rNumber + 1;
  const id = `${app.acronym}_${rNumber}`;

  //updating the rNumber in applications
  const updatedApp = await app.update({ rNumber });
  // return res.send({ updatedApp });

  //converting array of note data into a string
  noteString = notes.join(";");

  //creating a task
  const taskObj = {
    name,
    description,
    notes: noteString,
    id,
    state,
    creator,
    owner,
    createDate,
  };

  try {
    const task = await Task.create(taskObj);
    updatedApp.setTasks([task]);
    updatedApp.Plans[0].setTasks([task]);
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json(error?.name);
  }
}

//////////////////////////////////////////////////////////////
// add notes -------------------------------------------------
async function addNotes(req, res) {
  let newNotes;
  const name = req.params.taskName;
  const { notes } = req.body;

  const task = await Task.findByPk(name);

  if (!task) {
    res.status(400).json({ msg: "Task not found" });
  }

  //converting array of note data into a string
  const noteString = notes.join(";");

  //appending notes
  if (task.notes === "") {
    newNotes = noteString;
  } else {
    newNotes = task.notes + "-" + noteString;
  }

  //adding new notes to task
  try {
    const updatedTask = await Task.update(
      { notes: newNotes },
      { where: { name } }
    );
    res.status(200).json({ updatedTask });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
}

module.exports = { createTaskByApp, addNotes, createTaskByPlan };
