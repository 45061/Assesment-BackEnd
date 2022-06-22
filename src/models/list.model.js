const { Schema, model, models } = require("mongoose");

const listSchema = new Schema(
  {
    titleList: {
      required: true,
      type: String,

      validate: [
        {
          validator(value) {
            return models.List.findOne({ titleList: value })
              .then((list) => !list)
              .catch(() => false);
          },
          message: "Ya existe una lista con ese nombre",
        },
      ],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fav: {
      type: [{ type: Schema.Types.ObjectId, ref: "Fav" }],
    },
  },
  {
    timestamps: true,
  }
);

const List = model("List", listSchema);

module.exports = List;
