const mongoose = require("mongoose");

const connectDb = async () => {
	try {
		await mongoose.connect(process.env.URI);
		console.log("Connected to database");
	} catch (error) {
		console.log("Could not connect to database:", error);
		process.exit(1);
	}
};

module.exports = connectDb;
