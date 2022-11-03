const path = require("path");
const mongoose = require("mongoose");

const Category = require("../models/category");
const Place = require("../models/place");

const forNavbar = async () => {
  const categories = await Category.find({}, "_id title")
    .sort({ _id: 1 })
    .exec()
    .then((docs) => {
      return docs;
    });

  const idAllCategories = categories.map((item) => item._id);
  const titleAllCategories = categories.map((item) => item.title);

  return { idAllCategories, titleAllCategories };
};

const getCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId)
    .exec()
    .then((doc) => {
      console.log(doc);
      return doc;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });

  const titleCategory = category.title;
  const shortDescription = category.description;
  const imageCategory = category.img;

  const places = await Place.find(
    { category: titleCategory },
    "_id title img date"
  )
    .sort({ _id: -1 })
    .exec()
    .then((docs) => {
      console.log(docs);
      return docs;
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });

  const idPlace = places.map((item) => item._id);
  const titlePlace = places.map((item) => item.title);
  const imagePlace = places.map((item) => item.img);
  const datePlace = places.map((item) => item.date);

  //for navbar
  const allCategories = await forNavbar();
  const idAllCategories = allCategories.idAllCategories;
  const titleAllCategories = allCategories.titleAllCategories;

  res.render("category", {
    idAllCategories,
    titleAllCategories,
    titleCategory,
    shortDescription,
    imageCategory,
    idPlace,
    titlePlace,
    imagePlace,
    datePlace,
  });
};

const postAddCategory = async (req, res, next) => {
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

  const category = await new Category({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    img: file.name,
  });

  category
    .save()
    .then((result) => {
      console.log(result);
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

const patchEditCategory = async (req, res) => {
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

  let updateCategory = await Category.findOneAndUpdate(
    { title: req.body.category },
    result,
    { new: true }
  );
  console.log(updateCategory);

  res.json({ updateCategory });
};

const deleteCategory = async (req, res) => {
  const deleteCategory = await Category.deleteOne({ title: req.body.category });
  console.log(deleteCategory);

  res.end();
};

module.exports = {
  getCategory,
  postAddCategory,
  patchEditCategory,
  deleteCategory,
};
