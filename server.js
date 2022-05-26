const express = require("express");
const dotenv = require(`dotenv`);
const logger = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const { connect } = require("./server/config/connection");
const users = require("./server/routes/user.route");
const posts = require("./server/routes/post.route");
const auth = require("./server/routes/auth.route");
const comment = require("./server/routes/comment.route");
const like = require("./server/routes/like.route");
const multer = require("multer");
const multerConfig = require("./server/config/multer.config");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(bodyparser.json());
app.use(multer(multerConfig.options).fields(multerConfig.fields));
app.use(
	"/images",
	(req, res, next) => {
		res.set("Access-Control-Allow-Origin", "*");
		res.set("Cross-Origin-Resource-Policy", "same-site");
		next();
	},
	express.static(path.join(__dirname, "./server/src/image"))
);
app.use("/profile", users);
app.use("/posts", posts);
app.use("/auth", auth);
app.use("/comment", comment);
app.use("/like", like);
//conect db
connect();
//
dotenv.config({ path: "config.env" });
app.use((err, req, res, next) => {
	const error = app.get("env") === "development" ? err : {};
	const status = err.status || 500;

	//response to client

	return res.status(status).json({
		error: {
			message: error.message,
		},
	});
});

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "src/image");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});

var upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res, next) => {
	res.status(200).json("File uploaded successfully");
});
app.use((err, req, res, next) => {
	const error = app.get("env") === "development" ? err : {};
	const status = err.status || 500;
	//response to client
	console.log(err);
	return res.status(status).json({
		error: {
			message: error.message,
		},
	});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`server is running on ${PORT}`);
});
