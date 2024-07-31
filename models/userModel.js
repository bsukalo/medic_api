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
			parent: "details",
		},
		imageURL: {
			type: String,
			parent: "details",
		},
		status: {
			type: String,
			parent: "details",
		},
		orders: {
			type: Number,
			parent: "details",
		},
		dateOfBirth: {
			type: Date,
			parent: "details",
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
