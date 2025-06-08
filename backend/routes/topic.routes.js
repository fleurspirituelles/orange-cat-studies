import express from "express";
import * as controller from "../controllers/topic.controller.js";
import validateFields from "../middlewares/validateFields.js";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validateFields(["name"]), controller.create);
router.put("/:id", validateFields(["name"]), controller.update);
router.delete("/:id", controller.remove);

export default router;