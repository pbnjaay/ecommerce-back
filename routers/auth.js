const express = require("express");
const router = express.Router();
const {User} = require("../models/users");
const Joi = require("@hapi/joi");
const { compare } = require("bcrypt");

router.post("/", async(req, res) => {
	const { error} = validate(req.body);
	if(error) return res.status(400).send(error.details[0].message);
	let user = await User.findOne({email: req.body.email});
	if(!user) return res.status(400).send("invalid email or password. ");
	const isValidePassword = await compare(req.body.password, user.password);
	if(!isValidePassword) return res.status(400).send("invalid email or password. ");
	const token = user.generateAuthToken();
	res.send(token);
});

function validate(req) {
	const schema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string().required().min(6)
	});
	return schema.validate(req);
}
module.exports = router;