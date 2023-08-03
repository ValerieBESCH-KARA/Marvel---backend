const express = require("express");
const router = express.Router();
const axios = require("axios");

router.use(express.json());

router.get("/characters", async (req, res) => {
  const name = req.query.name || "";
  const skip = req.query.skyp || "0";
  const limit = req.query.limit || "100";

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}&name=${name}&skip=${skip}&limit=${limit}`
    );
    console.log("characters data>>>", response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ "message-character": error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
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

module.exports = router;
