const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticationMiddleware = async (req, res, next) => {
	console.log("ok");
	const authHeader = req.get("Authorization");
	if (!authHeader) {
		throw new Error("you much be login first");
	}

	const token = authHeader.split(" ")[1];

	const decodedToken = jwt.verify(token, "sanglaanhne");

	if (!decodedToken) {
		throw new Error("wrong token");
	}
	req.userId = decodedToken._id;

	next();
};

module.exports = {
	authenticationMiddleware,
};
