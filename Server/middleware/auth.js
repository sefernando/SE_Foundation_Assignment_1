const jwt = require("jsonwebtoken");

const privateKey = process.env.TOKEN_SECRET;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // console.log("token", token);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, privateKey);
    // console.log(req.body.userName);
    // console.log(decoded.userName);
    console.log(req.params.adminName !== decoded.userName);
    console.log(req.body.userName !== decoded.userName);

    if (req.body.adminUserName) {
      if (req.body.adminUserName !== decoded.userName) {
        return res.status(401).send("Authorization failed");
      }
    } else {
      if (req.body.userName !== decoded.userName) {
        return res.status(401).send("Authorization failed");
      }
      req.user = decoded;
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
