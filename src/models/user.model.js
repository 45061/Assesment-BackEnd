const { Schema, model, models } = require("mongoose");

const emailRegex = /^[^@]+@[^@]+.[^@]+$/;

const userSchema = new Schema(
  {
    username: {
      required: true,
      type: String,
    },
    email: {
      type: String,
      required: true,
      match: [emailRegex, "Email Invalido"],
      validate: [
        {
          validator(value) {
            return models.User.findOne({ email: value })
              .then((user) => !user)
              .catch(() => false);
          },
          message: "Ya existe un usuario registrado con ese correo",
        },
      ],
    },
    password: {
      required: true,
      type: String,
    },
    confirmPassword: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
