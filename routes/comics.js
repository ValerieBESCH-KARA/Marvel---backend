const express = require("express");
const router = express.Router();
const axios = require("axios");

router.use(express.json());

const apiKey = process.env.API_KEY;

router.get("/comics", async (req, res) => {
  try {
    const title = req.query.title || "";
    const limit = req.query.limit || "100";
    const skip = req.query.skip || "0";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&title=${title}&skip=${skip}&limit=${limit}`
    );
    console.log("comics data>>>", response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId || "";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}`
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/comic/:comicId", async (req, res) => {
  try {
    const comicId = req.params.id || "";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${apiKey}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
