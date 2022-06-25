const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.isAuthenticated = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("Su sesión expiró");
    }

    const [_, token] = authorization.split(" ");

    if (!token) {
      throw new Error("Su sesión expiró");
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = id;
    const existingUser = User.findById(req.user);

    if (!existingUser) {
      throw new Error("Usuario no encontrado");
    }

    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
