const router = require("express-promise-router")();
const postController = require("../controller/post.controller");
const {
	authenticationMiddleware,
} = require("../middleware/token.user.middleware");

router.get("/", postController.index);

router.post("/", authenticationMiddleware, postController.newPost);
router.put(
	"/update/:postID",
	authenticationMiddleware,
	postController.replacePost
);
router.delete(
	"/delete/:postID",
	authenticationMiddleware,
	postController.deletePost
);

router.get("/getPostByUserId/:userID", postController.getPostByUserID);
router.get(
	"/getPostByUser",
	authenticationMiddleware,
	postController.getPostByUser
);
router.get("/:postID", postController.getPost);
module.exports = router;
