const User = require("../models/user.model");
const List = require("../models/list.model");

module.exports = {
  async show(req, res) {
    try {
      const { listId } = req.params;
      const list = await List.findById(listId)
        .populate("userId", "userName email")
        .populate({
          path: "fav",
          select: "titleFav description link",
        });
      res.status(200).json({ message: "List found", data: list });
    } catch (err) {
      res.status(404).json({ message: "List not found", data: err });
    }
  },

  async create(req, res) {
    try {
      const userId = req.user;
      console.log(req.user);
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const list = await List.create({ ...req.body, userId });

      res.status(201).json({
        message: "List created",
        list: {
          titleList: list.titleList,
        },
      });
    } catch (err) {
      res.status(502).json(err);
    }
  },

  async destroy(req, res) {
    try {
      const { listId } = req.params;
      const userId = req.user;

      const list = await Video.findById(listId);

      if (!list) {
        res.status(404).json({ message: "List no found." });
        return;
      }

      if (list.userId.toString() !== userId) {
        res.status(403).json({ message: "Unauthorized user" });
        return;
      }

      const listDeleted = await List.deleteOne({ _id: listId });

      res.status(200).json({ message: "List Deleted", listDeleted });
    } catch (error) {
      res.status(502).json(error);
    }
  },
};
