const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		gender: {
			type: String,
			require: true,
		},
		profilePicture: {
			type: String,
			default: "",
		},
		dateOfBirth: {
			type: Date,
			require: true,
		},
		role: {
			type: Number,
			default: 1,
			require: true,
		},
		post: [
			{
				type: mongoose.Types.ObjectId,
				ref: "post",
			},
		],
		comment: [
			{
				type: mongoose.Types.ObjectId,
				ref: "comment",
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
