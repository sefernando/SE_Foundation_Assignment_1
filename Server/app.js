require("dotenv").config();
var cors = require("cors");

const express = require("express");
bodyParser = require("body-parser");

const app = express();

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const groupRoute = require("./routes/groupRoute");
const { sequelize, User, Group } = require("./models");

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

//server
app.listen(PORT, async () => {
  // await User.sync({ alter: true });
  // await Group.sync({ alter: true });
  // await sequelize.sync({ alter: true });
  console.log("app listen at port 5000");
});
