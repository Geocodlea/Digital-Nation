const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    imageCategory: ["munte1.jpg", "lac1.jpg", "city1.jpg"],
    titleCategory: ["Mountains", "Lakes", "Cities"],
    shortDescription: [
      "The Carpathian Mountains with peaks above 2.500 meters",
      "Romania has over 3.450 lakes, with almost 2.620 km2",
      "Romania has 217 cities with over 19 millions population",
    ],
    nrPlaces: [3, 5, 4],
    imagePlace: ["munte1.jpg", "lac1.jpg", "city1.jpg"],
    lastPlaces: ["Muntii Bucegi", "Lacul Sf. Ana", "Cluj-Napoca"],
    datePlace: ["26.10.2022", "27.10.2022", "28.10.2022"],
  });
});

module.exports = router;
