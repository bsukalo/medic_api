const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Please enter username"],
		},
		password: {
			type: String,
			required: [true, "Please enter password"],
		},
		name: {
			type: String,
		},
		orders: {
			type: Number,
		},
		dateOfBirth: {
			type: Date,
		},
		lastLogin: {
			type: Date,
			default: Date.now(),
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
