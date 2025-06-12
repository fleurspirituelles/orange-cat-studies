import express from "express";
import * as controller from "../controllers/performance.controller.js";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/user/:id_user", controller.getByUser);
router.get("/period/:id_user/:start/:end", controller.getByPeriod);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;