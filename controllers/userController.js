const asyncHander = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//@desc Register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHander(async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		res.status(400);
		throw new Error("Please input your information");
	}
	const userAvailable = await User.findOne({ username });
	if (userAvailable) {
		res.status(400);
		throw new Error("Username is taken");
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await User.create({ username, password: hashedPassword });

	console.log(`User registered ${user}`);
	if (user) {
		res.status(201).json({ _id: user.id, email: user.email });
	} else {
		res.status(400);
		throw new Error("Input is invalid");
	}
});

//@desc Log user in
//@route POST /api/users/login
//@access public
const loginUser = asyncHander(async (req, res) => {
	res.json({ message: "Log user in" });
});

//@desc Log user out
//@route POST /api/users/logout
//@access public
const logoutUser = asyncHander(async (req, res) => {
	res.json({ message: "Log user out" });
});

module.exports = { registerUser, loginUser, logoutUser };
