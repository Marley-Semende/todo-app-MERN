const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication required!" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const newUser = await User.findById(decodedToken.userId);

    if (!newUser) {
      return res.status(404).json({ message: "User not found" });
    }
    req.newUser = newUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { authenticate };
