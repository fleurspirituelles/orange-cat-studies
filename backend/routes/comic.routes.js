import express from "express";
import * as controller from "../controllers/comic.controller.js";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/user/:id_user", controller.getByUser);
router.post("/", controller.create);
router.delete("/:id", controller.remove);

export default router;