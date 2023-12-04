const User = require("../models/user.model");

async function checkAccess(req, res, next) {
  let users;
  try {
    users = await User.getAllUsers();
  } catch (error) {
    return next(error);
  }

  const currentDate = new Date();

  for (const user of users) {
    if (user.expiryDate) {
      if (user.expiryDate.getTime() < currentDate.getTime()) {
        user.hasAccess = false;
        user.saveAccess();
      }
    }
  }

  if (res.locals.uid) {
    let currentUser;
    try {
      currentUser = await User.getUserByID(res.locals.uid);
      req.session.hasAccess = currentUser.hasAccess;
      req.session.save();
    } catch (error) {
      return next(error);
    }
  }
  
  next();
}

module.exports = checkAccess;