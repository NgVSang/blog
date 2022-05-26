const router = require("express-promise-router")();
const userController = require("../controller/user.controller");
const {
	authenticationMiddleware,
} = require("../middleware/token.user.middleware");

router
	.route("/")
	.get(authenticationMiddleware, userController.getUser)
	.put(authenticationMiddleware, userController.replaceUser)
	.delete(authenticationMiddleware, userController.deleteUser);
router.get("/:userID", userController.getUserById);

module.exports = router;
