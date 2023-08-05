const express = require("express");
const router = express.Router();
const axios = require("axios");

router.use(express.json());

const apiKey = process.env.API_KEY;

router.get("/comics", async (req, res) => {
  try {
    const title = req.query.title;
    const page = req.query.page;

    let filters = "";
    if (title) {
      filters += `&title=${title}`;
    }
    if (page) {
      const skip = (page - 1) * 100;
      filters += `&skip=${skip}`;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}${filters}`
    );
    // console.log("comics data>>>", response.data);

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

router.get("/comic/:comicId", async (req, res) => {
  try {
    const comicId = req.params.comicId || "";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${apiKey}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
