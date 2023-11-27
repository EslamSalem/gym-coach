const User = require("../models/user.model");
const credentialsValid = require("../utility/validation");
const sessionFlash = require("../utility/session-flash");
const authentication = require("../utility/authentication");

function getHome(req, res) {
  res.render("home");
}

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      name: "",
      email: "",
      password: "",
      phone: ""
    };
  }

  res.render("signup", {sessionData: sessionData});
}

async function signup(req, res, next) {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  };

  if (!credentialsValid(userData)) {
    const flashedData = {
      message: "Invalid input!",
      ...userData,
    };

    sessionFlash.flashDataToSession(req, flashedData, function() {
      res.redirect("/signup");
    });

    return;
  }

  let user = new User(userData);

  try {
    const existsAlready = await user.existsAlready();
    if (existsAlready) {
      const flashedData = {
        message: "E-mail is already in use!",
        ...userData,
      };
  
      sessionFlash.flashDataToSession(req, flashedData, function() {
        res.redirect("/signup");
      });
  
      return;
    }
    await user.signup();
    user = await User.getUserByEmail(user.email);
  } catch (error) {
    return next(error);    
  }

  authentication.addUserAuthentication(req, user, function() {
    res.redirect("/expired");
  });
}

function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }

  res.render("login", {sessionData: sessionData});
}

async function login(req, res, next) {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  let user;
  try {
    user = await User.getUserByEmail(userData.email);
  } catch (error) {
    return next(error);    
  }

  if (!user) {
    const flashedData = {
      message: "Could not login! Please check your credentials.",
      ...userData,
    };

    sessionFlash.flashDataToSession(req, flashedData, function() {
      res.redirect("/login");
    });

    return;
  }

  const passwordMatch = await user.passwordMatch(userData.password);

  if (!passwordMatch) {
    const flashedData = {
      message: "Could not login! Please check your credentials.",
      ...userData,
    };

    sessionFlash.flashDataToSession(req, flashedData, function() {
      res.redirect("/login");
    });

    return;
  }

  authentication.addUserAuthentication(req, user, function() {
    if (user.isAdmin) {
    res.redirect("/admin/users");
    } else {
      res.redirect(`/program/${user.id}`);
    }
  });
}

function getExpired(req, res) {
  res.render("expired");
}

function logout(req, res) {
  authentication.removeUserAuthentication(req);
  res.redirect("/");
}

module.exports = {
  getHome: getHome,
  getSignup: getSignup,
  signup: signup,
  getLogin: getLogin,
  login: login,
  getExpired: getExpired,
  logout: logout,
};