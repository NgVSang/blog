const User = require("../models/user.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const getLikeInPost = async (req, res, next) => {
	try {
		const userId = req.params.userID;
		const postId = req.params.postID;
		const post = await Post.findById(postId);
		return res.status(201).send({ like: post.likes.length });
	} catch (error) {
		next(error);
	}
};

const getLikeInComment = async (req, res, next) => {
	try {
		const userId = req.params.userID;
		const commentId = req.params.commentID;
		const comment = await Comment.findById(commentId);
		return res.status(201).send({ like: comment.likes.length });
	} catch (error) {
		next(error);
	}
};

const likeInPost = async (req, res, next) => {
	try {
		const postId = req.params.postID;
		const userId = req.userId;
		const user = await User.findById(userId);
		const post = await Post.findById(postId);
		await post.likes.push(user._id);
		await post.save();
		return res.status(201).json("like in post: Ok");
	} catch (error) {
		next(error);
	}
};

const likeInComment = async (req, res, next) => {
	try {
		const commentId = req.params.commentID;
		const userId = req.userId;
		const user = await User.findById(userId);
		const comment = await Comment.findById(commentId);
		await comment.likes.push(user._id);
		await comment.save();
		return res.status(201).json("like in comment: Ok");
	} catch (error) {
		next(error);
	}
};

const checkUserLikeInComment = async (req, res, next) => {
	try {
		const userId = req.userId;
		const commentId = req.params.commentID;
		const comment = await Comment.findById(commentId);
		if (!comment.likes.includes(userId)) {
			return res.status(201).json({
				message: "userHasNotLikeInComment",
			});
		} else {
			return res.status(201).json({
				message: "userHasLikeInComment",
			});
		}
	} catch (error) {
		next(error);
	}
};
const checkUserLikeInPost = async (req, res, next) => {
	try {
		const userId = req.userId;
		const postId = req.params.postID;
		const post = await Post.findById(postId);
		if (!post.likes.includes(userId)) {
			return res.status(201).json({
				message: "userHasNotLikeInPost",
			});
		} else {
			return res.status(201).json({
				message: "userHasLikeInPost",
			});
		}
	} catch (error) {
		next(error);
	}
};

const updateListLikeInComment = async (req, res, next) => {
	try {
		const userId = req.userId;
		const commentId = req.params.commentID;
		const comment = await Comment.findById(commentId);
		if (!comment.likes.includes(userId)) {
			await Comment.findByIdAndUpdate(commentId, {
				$push: { likes: userId },
			});
			return res.status(201).json({
				like: comment.likes.length + 1,
				message: "userHasLikeInComment",
			});
		} else {
			await Comment.findByIdAndUpdate(commentId, {
				$pull: { likes: userId },
			});
			return res.status(201).json({
				like: comment.likes.length - 1,

				message: "userHasNotLikeInComment",
			});
		}
	} catch (error) {
		next(error);
	}
};

const updateListLikeInPost = async (req, res, next) => {
	try {
		const userId = req.userId;
		const postId = req.params.postID;
		const post = await Post.findById(postId);
		if (!post.likes.includes(userId)) {
			await Post.findByIdAndUpdate(postId, {
				$push: { likes: userId },
			});
			return res.status(201).json({
				like: post.likes.length + 1,
				message: "userHasLikeInPost",
			});
		} else {
			await Post.findByIdAndUpdate(postId, {
				$pull: { likes: userId },
			});
			return res.status(201).json({
				like: post.likes.length - 1,

				message: "userHasNotLikeInPost",
			});
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getLikeInPost,
	getLikeInComment,
	likeInPost,
	likeInComment,
	updateListLikeInComment,
	updateListLikeInPost,
	checkUserLikeInComment,
	checkUserLikeInPost,
};
