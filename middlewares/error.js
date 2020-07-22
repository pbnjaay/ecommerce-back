const winston = require("winston");
// eslint-disable-next-line no-unused-vars
module.exports = function(err, req, res, next) {
	//logging error
	winston.error(err.message, err);
	res.status(500).send("Something failed.");
};