const router = require("express").Router();
const userControllers = require("../controllers/user.controler");

router.route("/").get(userControllers.list);

router.route("/signup").post(userControllers.signup);
router.route("/signin").post(userControllers.signin);

module.exports = router;
