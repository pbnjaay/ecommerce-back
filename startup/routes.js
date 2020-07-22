const products = require("../routers/products");
const users = require("../routers/users");
const auth = require("../routers/auth");
const error = require("../middlewares/error");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
module.exports = function(app) {
	app.use(cors());
	app.use(express.json());
	app.use(helmet());
	if (app.get("env") === "development") {
		app.use(morgan("dev"));
		console.log("morgan enabled");
	}
	app.use("/uploads", express.static("uploads"));
	app.use("/api/products", products);
	app.use("/api/users", users);
	app.use("/api/auth", auth);
	app.use(error);
};