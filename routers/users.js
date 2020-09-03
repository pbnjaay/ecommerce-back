const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, validate} = require("../models/users");
const _ = require("lodash");

router.get("/me", async (req, res) => {
	const user = await User.findById(req.user._id).select("-password");
	res.send(user);
});

router.post("/", async (req, res) => {
	const {error} = validate(req.body);
	if(error) return res.status(400).send(error.details[0].message);
	let user = await User.findOne({email: req.body.email});
	if(user) return res.status(400).send("User already registred. ");
	user = new User(_.pick(req.body, ["firstName", "lastName", "email", "password"]));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(req.body.password, salt);
	const token = user.generateAuthToken();
	await user.save();
	res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;