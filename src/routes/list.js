const router = require("express").Router();
const { isAuthenticated } = require("../middleware/userAuth.middleware");
const listController = require("../controllers/list.controller");

router.route("/:listId").get(isAuthenticated, listController.show);

router.route("/").post(isAuthenticated, listController.create);

module.exports = router;
