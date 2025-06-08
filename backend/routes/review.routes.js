import express from "express";
import * as controller from "../controllers/review.controller.js";
import validateFields from "../middlewares/validateFields.js";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validateFields(["id_user", "id_question"]), controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;