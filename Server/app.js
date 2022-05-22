require("dotenv").config();

const express = require("express");
bodyParser = require("body-parser");

const app = express();

const authRoute = require("./routes/authRoute");
const { sequelize, User } = require("./models");

const PORT = process.env.PORT;

//global middleware
app.use(bodyParser.json());

//specific routes
app.use("/auth", authRoute);

//server
app.listen(PORT, async () => {
  // await User.sync({ alter: true });
  //await sequelize.sync({ alter: true });
  console.log("app listen at port 3000");
});
