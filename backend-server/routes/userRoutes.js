const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();
//routes
router.get("/profile", authenticate, (req, res) => {
  try {
    const username = req.newUser.username;
    res.json({ message: `Welcome ${username}` });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
