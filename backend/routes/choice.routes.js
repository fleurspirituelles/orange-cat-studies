import express from "express";
import ChoiceController from "../controllers/choice.controller.js";

const router = express.Router();

router.get("/", ChoiceController.getAll);
router.get("/:id", ChoiceController.getById);
router.post("/", ChoiceController.create);
router.put("/:id", ChoiceController.update);
router.delete("/:id", ChoiceController.remove);

export default router;