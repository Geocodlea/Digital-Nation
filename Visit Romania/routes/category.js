const express = require("express");
const router = express.Router();
const path = require("path");

/* GET category page. */
router.get(
  "/:titleCategory-:imageCategory-:shortDescription",
  function (req, res, next) {
    res.render("category", {
      titleCategory: req.params.titleCategory,
      imageCategory: req.params.imageCategory,
      shortDescription: req.params.shortDescription,
      imagePlace: {
        Mountains: ["munte1.jpg", "munte2.jpg", "munte3.jpg"],
        Lakes: ["lac1.jpg", "lac2.jpg", "lac3.jpg"],
        Cities: ["city1.jpg", "city2.jpg", "city3.jpg"],
      },
      nrPlaces: 3,
      titlePlace: ["Place 1", "Place 2", "Place 3"],
      datePlace: ["26.10.2022", "27.10.2022", "28.10.2022"],
    });
  }
);

router.post("/add-category", function (req, res, next) {
  let result = {};

  const title = req.body.title;
  result.title = title;
  console.log(title);

  const description = req.body.description;
  result.description = description;
  console.log(description);

  // retrieve the uploaded file
  const file = req.files.img;
  const uploadPath =
    path.dirname(__dirname) + "/public/images/categories/" + file.name;
  console.log(uploadPath);

  // use the mv() method to place the file on the server
  file.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    console.log("File uploaded!");
  });

  result.img = file.name;

  res.json({ result });
});

router.patch("/", (req, res) => {
  let result = {};

  if (req.body.title) {
    const title = req.body.title;
    console.log(title);
    result.title = title;
  }
  if (req.body.description) {
    const description = req.body.description;
    console.log(description);
    result.description = description;
  }
  if (req.files) {
    // retrieve the uploaded file
    const file = req.files.img;
    const uploadPath =
      path.dirname(__dirname) + "/public/images/categories/" + file.name;
    console.log(uploadPath);

    // use the mv() method to place the file on the server
    file.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);

      console.log("File uploaded!");
    });
    result.img = file.name;
  }

  res.json({ result });
});

router.delete("/", (req, res) => {
  const title = req.body.title;
  console.log(title);

  res.send("Category deleted");
});

module.exports = router;
