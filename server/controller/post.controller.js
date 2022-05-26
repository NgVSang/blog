const User = require("../models/user.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const index = async (req, res, next) => {
	try {
		const post = await Post.find({});
		return res.status(201).json({ posts: post });
	} catch (error) {
		next(error);
	}
};
const newPost = async (req, res, next) => {
	try {
		const userID = req.userId;
		const newPost = new Post(req.body);
		const user = await User.findById(userID);
		newPost.owner = user;
		if (req.files && req.files.photo) {
			newPost.Image = req.files.photo[0].filename;
		}
		await newPost.save();
		user.post.push(newPost._id);
		await user.save();
		return res.status(200).send({ post: newPost });
	} catch (error) {
		next(error);
	}
};

const getPost = async (req, res, next) => {
	try {
		const { postID } = req.params;
		const post = await Post.findById(postID);
		return res.status(200).json({ post });
	} catch (err) {
		next(err);
	}
};

const replacePost = async (req, res, next) => {
	try {
		const userID = req.userId;
		const { postID } = req.params;
		const post = await Post.findById(postID);
		const user = await User.findById(userID);
		if (post.owner._id == userID) {
			const newPost = req.body;
			if (req.files && req.files.photo) {
				newPost.Image = req.files.photo[0].filename;
			}
			const result = await Post.findByIdAndUpdate(postID, newPost);

			return res.status(200).json({ post: result, image: newPost.Image });
		} else {
			throw new Error("you can do this");
		}
	} catch (error) {
		next(error);
	}
};

const deletePost = async (req, res, next) => {
	try {
		const userID = req.userId;
		const { postID } = req.params;
		const post = await Post.findById(postID);
		const user = await User.findById(userID);
		console.log(post.owner._id == userID);

		if (post.owner._id == userID || user.role == 2) {
			console.log("abc");
			const comment = await Comment.find({});
			comment.forEach(async (e) => {
				if (e.path.split("/")[0] === post._id.toString())
					await Comment.findByIdAndDelete(e._id);
			});
			await Post.findByIdAndDelete(postID);
			return res.status(200).json({ delete: "ok" });
		} else {
			throw new Error("you can do this");
		}
	} catch (error) {
		next(error);
	}
};

const getPostByUserID = async (req, res, next) => {
	try {
		const userId = req.params.userID;
		const user = await User.findById(userId).populate("post");
		return res.status(201).json(user._doc.post);
	} catch (error) {
		next(error);
	}
};
const getPostByUser = async (req, res, next) => {
	try {
		const userId = req.userId;
		console.log(userId);
		const user = await User.findById(userId).populate("post");
		return res.status(201).send({ posts: user._doc.post });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	index,
	newPost,
	getPost,
	replacePost,
	deletePost,
	getPostByUserID,
	getPostByUser,
};
