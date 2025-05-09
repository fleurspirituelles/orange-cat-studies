const express = require("express");
const router = express.Router();
const controller = require("../controllers/comic.controller");

router.get("/", controller.listComics);
router.post("/", controller.createComic);
router.get("/:id", controller.getComic);
router.put("/:id", controller.updateComic);
router.delete("/:id", controller.deleteComic);

module.exports = router;