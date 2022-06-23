const User = require("../models/user.model");
const List = require("../models/list.model");
const Fav = require("../models/fav.model");

module.exports = {
  async create(req, res) {
    const { listId } = req.params;
    const userId = req.user;
    console.log(req.params);

    try {
      if (!listId) {
        res.status(404).json({ message: "list no found" });
        return;
      }
      const list = await List.findById(listId);

      if (!userId) {
        res.status(404).json({ message: "User no found" });
        return;
      }

      const favId = await Fav.create({
        userId,
        listId,
        ...req.body,
      });

      list.fav.push(favId);
      await list.save({ validateBeforeSave: false });

      res.status(201).json({
        message: "Fav created",
        fav: {
          titleFav: favId.titleFav,
        },
      });
    } catch (error) {
      res.status(502).json(error);
    }
  },

  async destroy(req, res) {
    try {
      const favId = req.params;

      await User.findByIdAndDelete(favId);
      res.status(200).json({ message: "Fav deleted" });
    } catch (error) {
      res.status(502).json(error);
    }
  },
};
