const express = require("express");
const router = express.Router();
const controller = require("../controllers/comic.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/code/:code", controller.getByCode);
router.get("/user/:id_user", controller.getByUser);
router.get("/album/:id_album", controller.getByAlbum);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;