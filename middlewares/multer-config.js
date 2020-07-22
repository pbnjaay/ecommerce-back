const multer = require("multer");
const MIME_TYPES = {
	"publics/jpg": "jpg",
	"publics/jpeg": "jpg",
	"publics/png": "png"
};
const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./uploads/");
	},
	filename: function(req, file, callback) {
		const name = file.originalname.split(" ").join("_");
		const extension = MIME_TYPES[file.mimetype];
		callback(null,  name + Date.now() + "." + extension);
	}
});
const upload = multer({ storage });


module.exports = upload;