const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Log user in
//@route POST /api/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		res.status(400);
		throw new Error("Username and password fields are required");
	}
	const user = await User.findOne({ username });

	if (user && (await bcrypt.compare(password, user.password))) {
		if (!user.isAdmin || user.isBlocked) {
			res.status(401);
			throw new Error(
				"Current user does not have required admin privileges or is blocked"
			);
		}
		const accessToken = jwt.sign(
			{
				user: {
					id: user.id,
					username: user.username,
					password: user.password,
				},
			},
			process.env.ACCESS_TOKEN,
			{ expiresIn: "15m" }
		);
		await User.findOneAndUpdate(
			{ _id: user.id },
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
			"Username and password combination does not match existing user"
		);
	}
});

//@desc Fetch users
//@route GET /api/users
//@access private
const fetchAllUsers = asyncHandler(async (req, res) => {
	try {
		const users = await User.find({});
		res.json({ count: users.length, results: users });
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch users" });
	}
});

//@desc Fetch details of specific user
//@route GET /api/users/details/(id)
//@access private
const fetchUserDetails = asyncHandler(async (req, res) => {
	let user = await User.findById(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	} else {
		res.status(200).json({
			id: user._id.toString(),
			username: user.username,
			name: user.name,
			orders: user.orders,
			imageURL: user.imageURL,
			status: user.status,
			dateOfBirth: user.dateOfBirth,
			lastLogin: user.lastLogin,
			isAdmin: user.isAdmin,
			isBlocked: user.isBlocked,
		});
	}
});

//@desc Block user by id
//@route POST /api/users/block/(id)
//@access private
const blockUser = asyncHandler(async (req, res) => {
	let user = await User.findById(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	} else if (user.isBlocked) {
		res.status(400);
		throw new Error("User already blocked");
	} else {
		await User.findByIdAndUpdate(req.params.id, {
			isBlocked: true,
		});

		res.status(200).send(`User ${user.username} successfully blocked`);
	}
});

//@desc Log user out
//@route POST /api/logout
//@access private
const logoutUser = asyncHandler(async (req, res) => {
	res.status(401).send("Logged out");
});

//@desc Register user
//@route POST /api/register
//@access private
const registerUser = asyncHandler(async (req, res) => {
	const { username, password, name, imageURL, status, orders, dateOfBirth } =
		req.body;
	if (!username || !password) {
		res.status(400);
		throw new Error("Username and password fields are required");
	}
	const userAvailable = await User.findOne({ username });
	if (userAvailable) {
		res.status(400);
		throw new Error("Username is taken");
	}
	if (orders < 0 || orders > 10) {
		res.status(400);
		throw new Error("Orders must be between 0 and 10");
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await User.create({
		username,
		password: hashedPassword,
		name,
		imageURL,
		status,
		orders,
		dateOfBirth,
	});

	console.log(`User registered ${user}`);
	if (user) {
		res.status(201).json({
			_id: user.id,
			password: hashedPassword,
			name: user.name,
			imageURL: user.imageURL,
			status: user.status,
			orders: user.orders,
			dateOfBirth: user.dateOfBirth,
		});
	} else {
		res.status(400);
		throw new Error("Input is invalid");
	}
});

//@desc Update user
//@route PUT /api/users/update/(id)
//@access private
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedUser);
});

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	fetchAllUsers,
	fetchUserDetails,
	blockUser,
	updateUser,
};
