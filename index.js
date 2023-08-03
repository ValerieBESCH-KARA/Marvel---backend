require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const apiKey = process.env.API_KEY;

app.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "Welcome on Marvel" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const title = req.query.title || "";
    const limit = req.query.limit || "100";
    const skip = req.query.skyp || "0";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&title=${title}&skip=${skip}&limit=${limit}`
    );
    // console.log("comics data>>>", response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}`
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/comic/:comicId", async (req, res) => {
  try {
    const comicId = req.params.comicId;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${apiKey}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.get("/characters", async (req, res) => {
  const name = req.query.name || "";
  const skip = req.query.skyp || "0";
  const limit = req.query.limit || "100";

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}&name=${name}&skip=${skip}&limit=${limit}`
    );
    // console.log("characters data>>>", response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ "message-character": error.message });
  }
});

app.get("/character/:characterId", async (req, res) => {
  try {
    const characterId = req.params.id;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${apiKey}`
    );
    return res.status(200).json(response.data);
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
