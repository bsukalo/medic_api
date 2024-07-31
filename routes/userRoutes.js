const express = require("express");
const {
	registerUser,
	loginUser,
	logoutUser,
	fetchAllUsers,
	fetchUserDetails,
	blockUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/login", loginUser);

router.get("/users", validateToken, fetchAllUsers);

router.get("/users/details/:id", validateToken, fetchUserDetails);

router.post("/users/block/:id", validateToken, blockUser);

router.post("/logout", validateToken, logoutUser);

router.post("/register", validateToken, registerUser);

module.exports = router;
