const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	type: {
		type: String,
		require: true,
		trim: true,
	},
	blog: [
		{
			type: mongoose.Types.ObjectId,
			ref: "post",
		},
	],
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
