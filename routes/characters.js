const express = require("express");
const router = express.Router();
const axios = require("axios");

router.use(express.json());

const apiKey = process.env.API_KEY;

router.get("/characters", async (req, res) => {
  const name = req.query.name;
  const page = req.query.page;

  let filters = "";
  if (name) {
    filters += `&name=${name}`;
  }
  if (page) {
    const skip = (page - 1) * 100;
    filters += `&skip=${skip}`;
  }

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}${filters}`
    );

    // console.log("characters data>>>", response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
router.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}`
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
