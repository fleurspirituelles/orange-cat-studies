import express from "express";
import TopicController from "../controllers/topic.controller.js";

const router = express.Router();

router.get("/", TopicController.getAll);
router.get("/:id", TopicController.getById);
router.post("/", TopicController.create);
router.put("/:id", TopicController.update);
router.delete("/:id", TopicController.remove);

export default router;