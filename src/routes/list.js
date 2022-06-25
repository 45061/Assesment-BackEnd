const router = require("express").Router();
const { isAuthenticated } = require("../middleware/userAuth.middleware");
const listController = require("../controllers/list.controller");

router.route("/lists").get(isAuthenticated, listController.list);

router.route("/:listId").get(isAuthenticated, listController.show);

router.route("/").post(isAuthenticated, listController.create);

router.route("/delete/:listId").delete(isAuthenticated, listController.destroy);

module.exports = router;
