import express from "express";
import { getAll, getById, getByEmail } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.get("/email/:email", getByEmail);

export default router;