const User = require("../models/user.model");

const adminCheckMiddleWare = async (req, res, next) => {
	const userID = req.userId;
	const user = await User.findById(userID);
	if (user.role == 2) {
		next();
	} else {
		throw new Error("you not admin");
	}
};

module.exports = {
	adminCheckMiddleWare,
};
