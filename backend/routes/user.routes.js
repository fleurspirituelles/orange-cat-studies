import express from "express";
import * as controller from "../controllers/user.controller.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.delete("/:id", controller.remove);
router.post("/sync", verifyFirebaseToken, controller.sync);

export default router;