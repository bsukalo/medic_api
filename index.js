const express = require("express");
const connectDb = require("./config/connectDb");
const dotenv = require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

connectDb();
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
	origin: "https://medic-web-nine.vercel.app",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
	credentials: true,
	optionsSuccessStatus: 204,
};

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () =>
	console.log(`Server is running on http://localhost:${port}`)
);
