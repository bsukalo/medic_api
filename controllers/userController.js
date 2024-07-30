const asyncHander = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register user
//@route POST /api/users/register
//@access private
const registerUser = asyncHander(async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		res.status(400);
		throw new Error("Username and password fields are required");
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
		res.status(201).json({ _id: user.id, password: hashedPassword });
	} else {
		res.status(400);
		throw new Error("Input is invalid");
	}
});

//@desc Log user in
//@route POST /api/users/login
//@access public
const loginUser = asyncHander(async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		res.status(400);
		throw new Error("Username and password fields are required");
	}
	const user = await User.findOne({ username });

	if (user && (await bcrypt.compare(password, user.password))) {
		const accessToken = jwt.sign(
			{
				user: {
					id: user.id,
					username: user.username,
					password: user.password,
				},
			},
			process.env.ACCESS_TOKEN,
			{ expiresIn: "5m" }
		);
		await User.findOneAndUpdate(
			{ username: user.username },
			{ lastLogin: Date.now() }
		);
		res.status(200).json({
			accessToken,
			_id: user.id,
			username: user.username,
			lastLogin: user.lastLogin,
		});
	} else {
		res.status(401);
		throw new Error(
			"Email and password combination does not match existing user"
		);
	}
});

//@desc Log user out
//@route POST /api/users/logout
//@access private
const logoutUser = asyncHander(async (req, res) => {
	res.json({ message: "Log user out" });
});

module.exports = { registerUser, loginUser, logoutUser };
