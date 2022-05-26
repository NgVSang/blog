const router = require("express-promise-router")();
const commentController = require("../controller/comment.controller");
const {
	authenticationMiddleware,
} = require("../middleware/token.user.middleware");

router.get("/user/:userID", commentController.getCommentByUserID);
router.get("/commentLevel1/:postID", commentController.getCommentLevel1);
router.get("/commentLevel2/:commentID", commentController.getCommentLevel2);
router.get("/commentLevel3/:commentID", commentController.getCommentLevel3);
router.get("/:commentID", commentController.getCommentById);
router.post(
	"/post/:postID",
	authenticationMiddleware,
	commentController.newCommentRoot
);
router.post(
	"/comment/:commentID",
	authenticationMiddleware,
	commentController.newCommentChild
);
router.post(
	"/comment/:commentID/:userID",
	authenticationMiddleware,
	commentController.newCommentLevel3
);
router.put(
	"/update/:commentID",
	authenticationMiddleware,
	commentController.replaceComment
);
router.delete(
	"/delete/:commentID",
	authenticationMiddleware,
	commentController.deleteComment
);

module.exports = router;
