const path = require("path");

const multer = require("multer");
const { v4: uuidV4 } = require("uuid");

const multerConfig = {};

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "server/src/image");
	},
	filename: (req, file, cb) => {
		cb(null, uuidV4() + path.extname(file.originalname));
	},
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/jpg"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

multerConfig.options = {
	storage: fileStorage,
	fileFilter: fileFilter,
};

multerConfig.fields = [
	{ name: "profilePicture", maxCount: 1 },
	{ name: "photo", maxCount: 1 },
];

module.exports = multerConfig;
