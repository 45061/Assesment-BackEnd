const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async list(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({ message: "Users found", data: users });
    } catch (error) {
      res.status(502).json(error);
    }
  },

  async signup(req, res) {
    try {
      const { password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        res.status(403).json({ message: "Passwords do not match" });
        return;
      }

      const encPassword = await bcrypt.hash(password, 8);
      const user = await User.create({
        ...req.body,
        password: encPassword,
        confirmPassword: "Confirmated",
      });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(201).json({
        message: "User created",
        token,
        user: {
          name: user.userName,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async signin(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid username or password");
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("Invalid username or password");
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(201).json({
        message: "User login",
        token,
        user: {
          name: user.userName,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(502).json(error);
    }
  },

  async destroy(req, res) {
    try {
      const userId = req.user;

      await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(502).json(error);
    }
  },
};
