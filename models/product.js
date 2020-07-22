const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	marque: {
		type: String,
		required: true
	},
	details: {
		type: String,
		required: true
	},
	fiche: {
		type: String,
		required: true
	}
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
	const schema = Joi.object({ 
		name: Joi.string().required(),
		price: Joi.number().required(),
		imageUrl: Joi.string(),
		category: Joi.string().required(),
		marque: Joi.string().required(),
		details: Joi.string(),
		fiche: Joi.string(),
	});
	return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;