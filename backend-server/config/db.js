const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const Task = require("../models/taskModel");
dotenv.config();

const URI = process.env.MONGO_URI;

async function main() {
  try {
    if (!URI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }

    const conn = await mongoose.connect(URI);
    console.log(`Connected to MongoDB successfully!: ${conn.connection.host}`);

    //insert a User
    const newUser = new User({
      username: "user1",
      email: "user1@example.com",
      password: "user1password",
      profilePicture:
        "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
      createdAt: new Date(),
    });

    await newUser.save();
    console.log(`User ${newUser} created successfully!`);

    //insert a new task
    const newTask = new Task({
      title: "Bake brownies",
      category: "Personal",
      dueDate: "2024-05-10",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: newUser._id,
    });

    await newTask.save();
    console.log(`Task ${newTask} created successfully!`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit(0);
  }
}
main();
