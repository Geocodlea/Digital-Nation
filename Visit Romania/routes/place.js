const express = require("express");
const router = express.Router();
const path = require("path");

/* GET place page. */
router.get("/:titlePlace-:datePlace-:imagePlace", function (req, res, next) {
  res.render("place", {
    titlePlace: req.params.titlePlace,
    datePlace: req.params.datePlace,
    imagePlace: req.params.imagePlace,
  });
});

router.get("/add-place", function (req, res, next) {
  res.render("add-place", {
    titleCategory: ["Mountains", "Lakes", "Cities"],
  });
});

router.get("/edit-place", function (req, res, next) {
  res.render("edit-place", {
    titleCategory: ["Mountains", "Lakes", "Cities"],
    titlePlace: JSON.stringify({
      Mountains: ["Place 1", "Place 2", "Place 3"],
      Lakes: ["Place 4", "Place 5", "Place 6"],
      Cities: ["Place 7", "Place 8", "Place 9"],
    }),
  });
});

router.post("/add-place", function (req, res, next) {
  let result = {};

  const category = req.body.category;
  result.category = category;
  console.log(category);

  const title = req.body.title;
  result.title = title;
  console.log(title);

  const description = req.body.description;
  result.description = description;
  console.log(description);

  const date = req.body.date;
  result.date = date;
  console.log(date);

  // retrieve the uploaded file
  const file = req.files.img;
  const uploadPath =
    path.dirname(__dirname) + "/public/images/places/" + file.name;
  console.log(uploadPath);

  // use the mv() method to place the file on the server
  file.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    console.log("File uploaded!");
  });

  result.img = file.name;

  res.json({ result });
});

router.patch("/edit-place", (req, res) => {
  let result = {};

  const category = req.body.category;
  console.log(category);
  result.category = category;

  const place = req.body.place;
  console.log(place);
  result.place = place;

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
      path.dirname(__dirname) + "/public/images/places/" + file.name;
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

router.patch("/edit-on-place", (req, res) => {
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
      path.dirname(__dirname) + "/public/images/places/" + file.name;
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

  res.send("Place deleted");
});

module.exports = router;
