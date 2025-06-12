import express from "express";
import * as controller from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/email/:email", controller.getByEmail);

export default router;