const { generateToken } = require("../utility/csrf-config");

function addCSRFToken(req, res, next) {
  res.locals.csrfToken = generateToken(req, res);
  next();
}

module.exports = addCSRFToken;