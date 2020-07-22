const mongoose = require("mongoose");

module.exports = function() {
	mongoose.connect("mongodb://localhost/evashop", {
		useNewUrlParser: true, 
		useUnifiedTopology: true, 
		useFindAndModify: false, 
		useCreateIndex: true});
	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", () => {
		console.log("Connected to MongoDb");
	});
};