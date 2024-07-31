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

		// details
		name: {
			type: String,
		},
		imageURL: {
			type: String,
		},
		status: {
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
		isAdmin: {
			type: Boolean,
			default: false,
		},
		isBlocked: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: false }
);

module.exports = mongoose.model("User", userSchema);
