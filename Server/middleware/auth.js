const jwt = require("jsonwebtoken");

const privateKey = process.env.TOKEN_SECRET;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  console.log("token", token);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, privateKey);

    //TODO ------------------------------------------------
    // if (req.body.username !== decoded.userName) {
    //   return res.status(401).send("unauthorized user name");
    // }

    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;