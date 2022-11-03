const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/category");

/* GET category page. */
router.get("/:categoryId", CategoryController.getCategory);

router.post("/add-category", CategoryController.postAddCategory);

router.patch("/", CategoryController.patchEditCategory);

router.delete("/", CategoryController.deleteCategory);

module.exports = router;
