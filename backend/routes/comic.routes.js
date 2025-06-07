import express from "express";
import {
  getAll,
  getById,
  getByUser,
  create,
  remove,
} from "../controllers/comic.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.get("/user/:id_user", getByUser);
router.post("/", create);
router.delete("/:id", remove);

export default router;