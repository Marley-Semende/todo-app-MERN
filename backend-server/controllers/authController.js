const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//Register a new user
async function signup(req, res, next) {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "Registration successful!" });
  } catch (error) {
    next(error);
  }
}

//Login an existing user
async function login(req, res, next) {
  const { username, password } = req.body;
  try {
    //Check user
    const newUser = await User.findOne({ username });
    if (!newUser) {
      return res.status(404).json({ message: "User not found" });
    }
    //Check password match
    const passwordMatch = await bcrypt.compare(password, newUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1 hour",
      }
    );
    res.json({ token });
  } catch (error) {
    next(error);
  }
}
//Logout a user
async function logout(req, res, next) {
  try {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
}

module.exports = { signup, login, logout };
