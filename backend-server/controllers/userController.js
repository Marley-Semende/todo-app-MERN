const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//signup function
async function signup(req, res, next) {
  const { username, password } = req.body;
  try {
    //Check if user exists
    const existingUser = User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new user document
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    //Save new user to database
    await newUser.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
}
//login function
async function login(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in DB
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate a JWT token for auth
    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1 hour",
      }
    );

    // Send jwt token in the response
    res.json({ token });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    // Clear the JWT token
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
}

async function updateUserProfile() {
  if (req.file) {
    // check if file uploaded
    if (req.file) {
      req.user.profilePicture = req.file.path;
    }

    // Update username
    req.user.username = req.body.username;

    try {
      // Save the updated user profile
      await req.user.save();
      res.json({ message: "User profile updated successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { signup, login, logout, updateUserProfile };
