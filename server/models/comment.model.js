const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		path: {
			type: String,
			default: null,
			index: true,
		},
		owner: {
			type: mongoose.Types.ObjectId,
			ref: "user",
		},
		reply: {
			type: mongoose.Types.ObjectId,
			ref: "user",
		},
		likes: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;
