const { Schema, model, models } = require("mongoose");

const userSchema = new Schema(
  {
    titleList: {
      required: true,
      type: String,
    },
    fav: {
      required: true,
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
