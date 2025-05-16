const express = require("express");
const router = express.Router();
const {
  registerWithEmailPassword,
  loginWithEmailPassword,
  loginWithGoogle,
} = require("../controllers/auth.controller");

router.post("/register", registerWithEmailPassword);
router.post("/login", loginWithEmailPassword);
router.post("/google-login", loginWithGoogle);

module.exports = router;