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

async function getUpdateInfo(req, res, next) {
  const userID = req.params.id;

  let user;
  try {
    user = await User.getUserByID(userID);
  } catch (error) {
    return next(error);
  }

  let errorMessage = sessionFlash.getSessionData(req);

  res.render("client/update-info", {
    user: user,
    errorMessage: errorMessage,
  });
}

async function updateInfo(req, res, next) {
  const userID = req.params.id;

  if (!req.body.name || req.body.name.trim() === "") {
    const errorMessage = "Invalid Input!";

    sessionFlash.flashDataToSession(req, errorMessage, function () {
      res.redirect(`/program/${userID}/updateInfo`);
    });

    return;
  }

  let user;
  try {
    user = await User.getUserByID(userID);
    user.name = req.body.name;
    if (req.file) {
      user.image = req.file.filename;
    }
    user.updateInfo();
  } catch (error) {
    return next(error);
  }

  res.redirect(`/program/${userID}`);
}

module.exports = {
  getProgram: getProgram,
  getUpdateInfo: getUpdateInfo,
  updateInfo: updateInfo,
};
