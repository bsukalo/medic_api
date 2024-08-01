const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
	let token;

	let authHeader = req.headers.authorization || req.headers.Authorization;
	if (authHeader && authHeader.startsWith("Bearer")) {
		token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
			if (error) {
				res.status(401);
				throw new Error("Authorization failed or token expired");
			}
			req.user = decoded.user;
			next();
		});

		if (!token) {
			res.status(401);
			throw new Error("Authorization failed or missing token");
		}
	}
});

module.exports = validateToken;
