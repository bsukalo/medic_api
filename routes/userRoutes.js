const express = require("express");
const {
	registerUser,
	loginUser,
	logoutUser,
	fetchAllUsers,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/login", loginUser);

router.get("/users", fetchAllUsers);

router.post("/logout", logoutUser);

router.post("/register", validateToken, registerUser);

module.exports = router;
