const express = require("express");
const { signup, login, fetchUserProfile } = require("../controllers/authController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authenticateToken, fetchUserProfile); // Protect this route

module.exports = router;
