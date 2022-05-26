const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		Image: {
			type: String,
			default: "",
		},
		description: {
			type: String,
			required: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
		likes: {
			type: Array,
			default: [],
		},
		category: {
			type: mongoose.Types.ObjectId,
			ref: "category",
		},
	},
	{ timestamps: true }
);

const post = mongoose.model("post", postSchema);

module.exports = post;
