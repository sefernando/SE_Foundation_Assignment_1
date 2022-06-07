require("dotenv").config();
var cors = require("cors");

const express = require("express");
bodyParser = require("body-parser");

const app = express();

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const groupRoute = require("./routes/groupRoute");
const appRoute = require("./routes/appRoute");

const { sequelize, User, Group, Application, Plan, Task } = require("./models");

const PORT = process.env.PORT;

//global middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());

//specific routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/group", groupRoute);
app.use("/app", appRoute);

//server
app.listen(PORT, async () => {
  // await User.sync({ alter: true });
  // await Group.sync({ alter: true });
  // await sequelize.sync({ force: true });
  // await Application.sync({ alter: true });
  // await Plan.sync({ force: true });
  // await Task.sync({ force: true });
  console.log("app listen at port 5000");
});
