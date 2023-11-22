const { doubleCsrf } = require('csrf-csrf');

const {
  generateToken,
  doubleCsrfProtection,
} = doubleCsrf({
  cookieName: '_csrf',
  cookieOptions: {
    secure: true,
    sameSite: "lax",
  },
  getSecret: () => 'supersecret',
  getTokenFromRequest: req => req.body.csrfToken,
});

module.exports = {
  generateToken: generateToken,
  doubleCsrfProtection: doubleCsrfProtection,
};