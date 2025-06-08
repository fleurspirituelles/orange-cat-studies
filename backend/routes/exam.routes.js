import express from "express";
import * as controller from "../controllers/exam.controller.js";

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);

export default router;