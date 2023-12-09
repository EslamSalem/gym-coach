const User = require("../models/user.model");

const sessionFlash = require("../utility/session-flash");

async function getProgram(req, res, next) {
  const userID = req.params.id;

  let user;
  try {
    user = await User.getUserByID(userID);
  } catch (error) {
    return next(error);
  }

  res.render("client/program", {
    user: JSON.stringify(user),
  });
}

module.exports = {
  getProgram: getProgram,
};
