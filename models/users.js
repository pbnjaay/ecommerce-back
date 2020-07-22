const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	isAdmin: {
		type: Boolean
	}
});
userSchema.methods.generateAuthToken = function() {
	return jwt.sign({_id: this._id, isAdmin: this.lastName }, config.get("jwtPrivatKey"));
};
const User = mongoose.model("User", userSchema);
function validateUser(user) {
	const schema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().required().min(6)
	});
	return schema.validate(user);
}
exports.User = User;
exports.validate = validateUser;