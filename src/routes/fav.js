const router = require("express").Router();
const favController = require("../controllers/fav.controller");
const { isAuthenticated } = require("../middleware/userAuth.middleware");

router.route("/:listId/new-fav").post(isAuthenticated, favController.create);
router
  .route("/:listId/remove-fav")
  .delete(isAuthenticated, favController.destroy);

module.exports = router;
