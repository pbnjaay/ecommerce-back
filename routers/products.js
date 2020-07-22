const express = require("express");
const router = express.Router();
const { validate, Product } = require("../models/product");
// const _ = require("lodash");
const upload = require("../middlewares/multer-config");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/", async (req, res) => {
	const product = await Product.find().sort({name: 1 });
	res.send( product);
});

router.get("/:id", async(req, res) => {
	const product = await Product.findById(req.params.id);
	if(!product) return res.status(404).send("This product with the given id does not exist");
	res.send(product);
});

router.post("/", [auth, admin], upload.single("imageUrl"), async(req, res) => {
	const { error } = validate(req.body);
	if(error) return res.status(400).send(error.details[0].message);
	const product = new Product({
		name:req.body.name,
		price: req.body.price,
		category: req.body.category, 
		marque: req.body.marque,
		details: req.body.details, 
		fiche: req.body.fiche, 
		imageUrl:  `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
	});
	await product.save();
	res.send(product);
});

router.put("/:id", [auth, admin], upload.single("imageUrl"), async(req, res) => {
	const { error } = validate(req.body);
	if(error) return res.status(400).send(error.details[0].message);
  
	const product = await Product.findByIdAndUpdate(
		req.params.id,
		{
			name:req.body.name,
			price: req.body.price,
			category: req.body.category, 
			marque: req.body.marque,
			details: req.body.details, 
			fiche: req.body.fiche, 
			imageUrl: req.body.imageUrl 
				? req.body.imageUrl 
				: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
		},
		{new: true}
	);
  
	if(!product) return res.status(404).send("This product with the given id does not exist");

	res.send(product);
});

router.delete("/:id", [auth, admin], async(req, res) => {
	const product = await Product.findByIdAndRemove((req.params.id));
	if(!product) return res.status(404).send("This product with the given id does not exist");
	res.send(product);
});

module.exports = router;