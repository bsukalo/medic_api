const express = require("express");
const connectDb = require("./config/connectDb");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");

connectDb();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () =>
	console.log(`Server is running on http://localhost:${port}`)
);
