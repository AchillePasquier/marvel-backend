require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json("Welcome to Marvel API !");
});

//List of characters
app.get("/characters", async (req, res) => {
  try {
    const skip = req.query.skip;
    const limit = req.query.limit;
    const name = req.query.name;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}&name=${name}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

//list of comics
app.get("/comics", async (req, res) => {
  try {
    const skip = req.query.skip;
    const limit = req.query.limit;
    const name = req.query.name;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}&title=${name}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

//informations about a character
app.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.all("*", (req, res) => {
  res.json({ message: "This page doesn't exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server Started ! 🚀");
});
