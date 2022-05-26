const { nextTick } = require("process");
const User = require("../models/user.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const bcrypt = require("bcryptjs");

const index = async (req, res, next) => {
	try {
		const users = await User.find({});
		return res.status(201).json({ users });
	} catch (error) {
		next(error);
	}
};
const getUserById = async (req, res, next) => {
	try {
		const users = await User.findById(req.params.userID);
		return res.status(201).send({ users: users });
	} catch (error) {
		next(error);
	}
};
const newUser = async (req, res, next) => {
	try {
		const newUser = new User(req.body);

		if (req.files && req.files.photo) {
			newUser.profilePicture = req.files.photo[0].filename;
		}
		console.log("profile picture", newUser.profilePicture);
		if (newUser.profilePicture == "")
			newUser.profilePicture = "avatarDefault.png";
		await newUser.save();
		return res.status(200).json({ user: newUser });
	} catch (error) {
		next(error);
	}
};

const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId);
		return res.status(200).send({ profile: user });
	} catch (error) {
		next(error);
	}
};

const replaceUser = async (req, res, next) => {
	try {
		const userID = req.userId;
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(req.body.newPassword, salt);
		const user = await User.findById(req.userId);
		let image = "";
		const validate = await bcrypt.compare(req.body.password, user.password);
		if (!validate) throw new Error("Wrong");
		if (req.files && req.files.profilePicture) {
			image = req.files.profilePicture[0].filename;
		}

		if (image == "") image = user.profilePicture;
		const newUser = req.body;
		newUser.profilePicture = image;
		newUser.password = hashedPass;
		console.log(newUser);
		const result = await User.findByIdAndUpdate(userID, newUser);
		const findUser = await User.findById(userID);
		return res.status(200).json({ user: findUser });
	} catch (error) {
		next(error);
	}
};
/*
const updateUser = async (req, res, next) => {
	try {
		const { userID } = req.params;
		const newUser = req.body;
		const result = await User.findByIdAndUpdate(userID, newUser);
		return res.status(200).json({ success: true });
	} catch (error) {
		next(error);
	}
};

*/
const deleteUser = async (req, res, next) => {
	try {
		const userID = req.userId;
		const result = await User.findByIdAndDelete(userID);
		return res.status(200).json({ success: true });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	index,
	newUser,
	getUser,
	replaceUser,
	deleteUser,
	getUserById,
};
