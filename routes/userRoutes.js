const express = require("express");
const {
	registerUser,
	loginUser,
	logoutUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", validateToken, registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

module.exports = router;
