const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (req, res, next) {
	const token = req.header("x-auth-token");
	if(!token) return res.status(401).send("Access denied. No token provided.");

	try {
		const decoded = jwt.decode(token, config.get("jwtPrivatKey"));
		req.user = decoded;
		next();
	} catch (ex) {
		res.status(400).send("Invalid token.");
	}
};
//recuperer le oken
//si sa exis connec
//sinon 40un acces refuser