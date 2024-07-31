const express = require("express");
const connectDb = require("./config/connectDb");
const dotenv = require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api", require("./routes/userRoutes"));

app.listen(port, () =>
	console.log(`Server is running on http://localhost:${port}`)
);
