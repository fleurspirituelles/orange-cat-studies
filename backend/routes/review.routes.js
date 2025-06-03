import express from "express";
import ReviewController from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", ReviewController.getAll);
router.get("/:id", ReviewController.getById);
router.post("/", ReviewController.create);
router.delete("/:id", ReviewController.remove);

export default router;