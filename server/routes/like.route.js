const router = require("express-promise-router")();
const likeController = require("../controller/like.controller");
const {
	authenticationMiddleware,
} = require("../middleware/token.user.middleware");

router.get("/post/:postID", likeController.getLikeInPost);
router.get("/comment/:commentID", likeController.getLikeInComment);
router.get(
	"/checkUserLikeInPost/:postID",
	authenticationMiddleware,
	likeController.checkUserLikeInPost
);
router.get(
	"/checkUserLikeInComment/:commentID",
	authenticationMiddleware,
	likeController.checkUserLikeInComment
);
router.post(
	"/post/:postID",
	authenticationMiddleware,
	likeController.likeInPost
);
router.post(
	"/comment/:commentID",
	authenticationMiddleware,
	likeController.likeInComment
);
router.put(
	"/doLikeIncomment/:commentID",
	authenticationMiddleware,
	likeController.updateListLikeInComment
);
router.put(
	"/doLikeInPost/:postID",
	authenticationMiddleware,
	likeController.updateListLikeInPost
);

module.exports = router;
