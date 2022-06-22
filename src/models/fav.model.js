const { Schema, model, models } = require("mongoose");

const favSchema = new Schema(
  {
    titleFav: {
      required: true,
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      required: true,
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listId: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Fav = model("Fav", favSchema);

module.exports = Fav;
