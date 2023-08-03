require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const apiKey = process.env.API_KEY;

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

app.get("/", async (req, res) => {
  try {
    return res.status(200).json("Welcome on Marvel");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  try {
    return res.status(404).json("Not found");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT + " 🤓");
});
