const express = require("express");
const router = express.Router();

const PlaceController = require("../controllers/place");

router.get("/add-place", PlaceController.getAddPlace);

router.get("/edit-place", PlaceController.getEditPlace);

router.get("/:placeId", PlaceController.getPlace);

router.post("/add-place", PlaceController.postAddPlace);

router.patch("/edit-place", PlaceController.patchEditPlace);

router.delete("/", PlaceController.deletePlace);

module.exports = router;
