const mongoose = require("mongoose");

const connect = () =>
	mongoose
		.connect(
			"mongodb+srv://NgVSang:Sang100302@demoproject.mbabi.mongodb.net/Blog?retryWrites=true&w=majority"
		)
		.then(() => console.log(`connect success`))
		.catch((err) => console.log(`cant connect`, err));

module.exports = { connect };
