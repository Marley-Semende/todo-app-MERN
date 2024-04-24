const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/db");

const app = express();

//body parser middleware
app.use(bodyParser.json());

//connect to database
async function connectToMongoDB() {
  try {
    await mongoose.connect(db.URI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
