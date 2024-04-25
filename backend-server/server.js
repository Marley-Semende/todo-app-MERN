const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/db");
//import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const URI = process.env.MONGO_URI;

const app = express();

//Body parser middleware
app.use(bodyParser.json());

//Connect to database
async function connectToMongoDB() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}
connectToMongoDB();

//Use routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/task", taskRoutes);

//Global middleware for error handling
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
