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

router.get("/users", fetchAllUsers);

router.get("/users/details/:id", fetchUserDetails);

router.post("/users/block/:id", blockUser);

router.post("/logout", logoutUser);

router.post("/register", validateToken, registerUser);

module.exports = router;
