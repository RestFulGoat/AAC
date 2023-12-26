const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require('./../config');

module.exports = ({ transient = false } = {}) =>

  async function checkAuth(req, res, next) {
    if (req.path == "/login") return next();
    const headerValue = req.headers.Authorization ?? req.headers.authorization;

    if (!headerValue) return transient ? next() : res.sendStatus(401);
    const [type, token] = headerValue.split(/\s+/);

    if (type !== "Bearer") return transient ? next() : res.sendStatus(401);
    const payload = jwt.verify(token, config.JWT_SECRET);
    
    req.user = await User.findByPk(payload.userId);

    next();
  };