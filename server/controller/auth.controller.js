const User = require("../models/user.model");
const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validate } = require("../models/user.model");

const register = async (req, res, next) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(req.body.password, salt);
		let image = "";
		if (req.files && req.files.profilePicture) {
			image = req.files.profilePicture[0].filename;
		}
		if (image == "") image = "avatarDefault.png";
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPass,
			gender: req.body.gender,
			profilePicture: image,
			dateOfBirth: req.body.dateOfBirth,
		});
		const user = await newUser.save();
		res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		!user && res.status(400).json("Wrong account");

		const validate = await bcrypt.compare(req.body.password, user.password);
		!validate && res.status(400).json("Wrong account");

		const token = jwt.sign({ _id: user._id.toString() }, "sanglaanhne", {
			expiresIn: "1d",
		});

		res.status(200).send({
			user: user,
			id: user._id,
			email: user.email,
			gender: user.gender,
			dateOfBirth: user.dateOfBirth,
			profilePicture: user.profilePicture,
			accessToken: token,
		});
	} catch (err) {
		next(err);
	}
};

const logout = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

module.exports = {
	register,
	login,
	logout,
};
