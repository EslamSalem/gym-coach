const Nutrition = require("../models/nutrition.model");
const Log = require("../models/log.model");
const User = require("../models/user.model");

async function getUsers(req, res, next) {
  let users;
  let logs;
  let nutrition;

  try {
    users = await User.getAllUsers();
    logs = await Log.getAllLogs();
    nutrition = await Nutrition.getAllNutrition();
  } catch (error) {
    return next(error);
  }
  res.render("admin/manage-users", {
    users: JSON.stringify(users),
    logs: JSON.stringify(logs),
    nutrition: JSON.stringify(nutrition),
  });
}

async function updateUserLogs(req, res, next) {
  const userID = req.params.id;

  let user;
  try {
    user = await User.getUserByID(userID);
    user.logs = req.body.logs;
    await user.updateLogs();
  } catch (error) {
    return next(error);
  }

  res.json({});
}

async function updateUserNutrition(req, res, next) {
  const userID = req.params.id;

  let user;
  try {
    user = await User.getUserByID(userID);
    user.nutrition = req.body.nutrition;
    await user.updateNutrition();
  } catch (error) {
    return next(error);
  }

  res.json({});
}

async function toggleAccess(req, res, next) {
  const userID = req.params.id;

  let user;
  try {
    user = await User.getUserByID(userID);

    user.hasAccess = req.body.access;
    
    if (req.body.expiryDate) {
      user.expiryDate = new Date(req.body.expiryDate);
    } else user.expiryDate = null;
    
    user.saveAccess();
  } catch (error) {
    return next(error);
  }

  res.json({});
}

module.exports = {
  getUsers: getUsers,
  updateUserLogs: updateUserLogs,
  updateUserNutrition: updateUserNutrition,
  toggleAccess: toggleAccess,
};
