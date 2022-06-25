const User = require("../models/user.model");
const List = require("../models/list.model");
const Fav = require("../models/fav.model");

module.exports = {
  async list(req, res) {
    try {
      const lists = await List.find().populate({
        path: "fav",
        select: "titleFav description link",
      });
      res.status(200).json({ message: "Lists found", data: lists });
    } catch (error) {
      res.status(502).json(error);
    }
  },

  async show(req, res) {
    try {
      const { listId } = req.params;
      if (!listId) {
        res.status(400).json({ message: "List not found" });
      }
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
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const list = await List.create({ ...req.body, userId });

      res.status(201).json({
        message: "List created",
        list,
      });
    } catch (err) {
      res.status(502).json(err);
    }
  },

  async destroy(req, res) {
    try {
      const { listId } = req.params;
      const userId = req.user;
      const list = await List.findById(listId);

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
