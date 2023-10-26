const firebase = require("./firebase/index.js");

// Checks Firebase token from user login
// Credits to: https://dev.to/betiol/how-to-handle-authentication-on-node-js-using-firebase-5ajn
exports.authMiddleware = (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    res.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];
  firebase
    .auth()
    .verifyIdToken(token)
    .then(() => next())
    .catch((error) => {
      console.error("Token verification error:", error);
      res.status(403).send("Could not authorize");
    });
};