const User = require("../models/user.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const getCommentByUserID = async (req, res, next) => {
	try {
		const userId = req.params.userID;
		const user = await User.findById(userId).populate("comment");
		return res.status(201).json(user._doc.comment);
	} catch (error) {
		next(error);
	}
};

const getCommentLevel1 = async (req, res, next) => {
	try {
		const postId = req.params.postID;
		const comment = await Comment.find({});
		const commentOfPost = [];
		for (let i = 0; i < comment.length; i++) {
			if (
				comment[i].path.split("/")[0] === postId &&
				!comment[i].path.split("/")[1]
			) {
				commentOfPost.push(comment[i]);
			}
		}
		return res.status(201).send({ comment: commentOfPost });
	} catch (error) {
		next(error);
	}
};

const getCommentLevel2 = async (req, res, next) => {
	try {
		const commentId = req.params.commentID;
		const comment = await Comment.find({});
		const commentOfComment = [];
		for (let i = 0; i < comment.length; i++) {
			if (
				comment[i].path.split("/")[1] === commentId &&
				!comment[i].path.split("/")[2]
			) {
				commentOfComment.push(comment[i]);
			}
		}
		return res.status(201).send({ comment: commentOfComment });
	} catch (error) {
		next(error);
	}
};
const getCommentLevel3 = async (req, res, next) => {
	try {
		const commentId = req.params.commentID;
		const comment = await Comment.find({});
		const commentOfComment = [];
		for (let i = 0; i < comment.length; i++) {
			if (
				comment[i].path.split("/")[2] === commentId &&
				!comment[i].path.split("/")[3]
			) {
				commentOfComment.push(comment[i]);
			}
		}
		return res.status(201).send({ comment: commentOfComment });
	} catch (error) {
		next(error);
	}
};

const getCommentById = async (req, res, next) => {
	try {
		const commentId = req.params.commentID;
		const comment = await Comment.findById(commentId);
		return res.status(200).json({ comment: comment });
	} catch (error) {
		next(error);
	}
};
const newCommentRoot = async (req, res, next) => {
	try {
		const userID = req.userId;
		const postId = req.params.postID;
		const newComment = new Comment(req.body);
		const user = await User.findById(userID);
		const post = await Post.findById(postId);
		newComment.owner = user;
		newComment.path = post._id.toString();
		await newComment.save();
		user.comment.push(newComment._id);
		await user.save();
		return res.status(200).json({ comment: newComment });
	} catch (error) {
		next(error);
	}
};

const newCommentChild = async (req, res, next) => {
	try {
		const userID = req.userId;
		const commentId = req.params.commentID;
		const newComment = new Comment(req.body);
		const commentFather = await Comment.findById(commentId);
		const user = await User.findById(userID);
		newComment.owner = user;
		newComment.path = commentFather.path + "/" + commentFather._id.toString();
		await newComment.save();
		user.comment.push(newComment._id);
		await user.save();
		return res.status(200).json({ comment: newComment });
	} catch (error) {
		next(error);
	}
};

const newCommentLevel3 = async (req, res, next) => {
	try {
		const userID = req.userId;
		const commentId = req.params.commentID;
		const userId = req.params.userID;
		const newComment = new Comment(req.body);
		const userReply = await User.findById(userId);
		const commentFather = await Comment.findById(commentId);
		const user = await User.findById(userID);
		newComment.owner = user;
		newComment.reply = userReply;
		newComment.path = commentFather.path;
		await newComment.save();
		user.comment.push(newComment._id);
		await user.save();
		const ans = await Comment.findById(newComment._id);
		return res.status(200).send({ comment: ans });
	} catch (error) {
		next(error);
	}
};

const replaceComment = async (req, res, next) => {
	try {
		const userID = req.userId;
		const commentId = req.params.commentID;
		const comment = await Comment.findById(commentId);
		const user = await User.findById(userID);
		if (comment.owner._id.toString === user._id.toString) {
			const newComment = req.body;
			const result = await Comment.findByIdAndUpdate(commentId, newComment);
			return res.status(200).json({ comment: result });
		} else {
			throw new Error("you can do this");
		}
	} catch (error) {
		next(error);
	}
};

const deleteComment = async (req, res, next) => {
	try {
		const userID = req.userId;
		const commentId = req.params.commentID;
		const comment = await Comment.findById(commentId);
		const user = await User.findById(userID);
		if (comment.owner._id.toString == user._id.toString || user.role == 2) {
			await Comment.findByIdAndDelete(commentId);
			return res.status(200).json({ delete: "ok" });
		} else {
			throw new Error("you can do this");
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getCommentByUserID,
	getCommentById,
	newCommentRoot,
	newCommentChild,
	replaceComment,
	deleteComment,
	getCommentLevel1,
	getCommentLevel2,
	getCommentLevel3,
	newCommentLevel3,
};
