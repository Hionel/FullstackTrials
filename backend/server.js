const express = require("express");
const cors = require("cors");
const mongoose = require("./database/mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const authRouter = require("./router/auth-router");
const homeRouter = require("./router/home-router");

const port = process.env.PORT || 3000;

const mongooseDB = new mongoose();
mongooseDB.connect();

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/home", homeRouter);

app.get("/", (req, res) => {
	res.send("Server up n running...");
});
app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
