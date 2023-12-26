const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require('./../config');

//verification l'authentification
module.exports = ({ transient = false } = {}) =>
  
  async function checkAuth(req, res, next) {
    // si la requete est la route de connexion alors on passe à la prochaine middleware
    if (req.path == "/login") return next();

    // on recupere la valeur header 
    const headerValue = req.headers.Authorization ?? req.headers.authorization;

    // si header pas présent
    if (!headerValue) return transient ? next() : res.sendStatus(401);
    // Extraction du type et du token du header
    const [type, token] = headerValue.split(/\s+/);

    // si le type n'est pas 'Bearer'
    if (type !== "Bearer") return transient ? next() : res.sendStatus(401);
    // on verifie le token avec JWT
    const payload = jwt.verify(token, config.JWT_SECRET);

    // on recupere l'utilisateur associé au token
    req.user = await User.findByPk(payload.userId);

    // passage à la prochaine middleware
    next();
  };