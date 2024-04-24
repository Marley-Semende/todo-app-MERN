const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: String,
  createdAt: {
    type: Date,
    default: Date,
  },
});
//model creation
const User = mongoose.model("User", userSchema);
module.exports = User;
