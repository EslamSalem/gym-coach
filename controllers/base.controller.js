const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51O7Z0dIGuQXC8ga6v9GzDZPGsvt5tZLnDIyjKEYn0l0QS73Bfpq7CbmPJTCBNi7ZBENRrW8jdafvK7Dz7veqQKDC00Q5nBFilP"
);

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
      phone: "",
    };
  }

  res.render("signup", { sessionData: sessionData });
}

async function signup(req, res, next) {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  };

  if (req.file) {
    userData.image = req.file.filename;
  }

  if (!credentialsValid(userData)) {
    const flashedData = {
      message: "Invalid input!",
      ...userData,
    };

    sessionFlash.flashDataToSession(req, flashedData, function () {
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

      sessionFlash.flashDataToSession(req, flashedData, function () {
        res.redirect("/signup");
      });

      return;
    }
    await user.signup();
    user = await User.getUserByEmail(user.email);
  } catch (error) {
    return next(error);
  }

  authentication.addUserAuthentication(req, user, function () {
    res.redirect(`/program/${user.id}`);
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

  res.render("login", { sessionData: sessionData });
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

    sessionFlash.flashDataToSession(req, flashedData, function () {
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

    sessionFlash.flashDataToSession(req, flashedData, function () {
      res.redirect("/login");
    });

    return;
  }

  authentication.addUserAuthentication(req, user, function () {
    if (user.isAdmin) {
      res.redirect("/admin/users");
    } else {
      res.redirect(`/program/${user.id}`);
    }
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

  res.render("update-info", {
    user: user,
    errorMessage: errorMessage,
  });
}

async function updateInfo(req, res, next) {
  const userID = req.params.id;

  if (!req.body.name || req.body.name.trim() === "") {
    const errorMessage = "Invalid Input!";

    sessionFlash.flashDataToSession(req, errorMessage, function () {
      res.redirect(`/${userID}/updateInfo`);
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

  if (user.isAdmin) {
    res.redirect("/admin/users");
  } else {
    res.redirect(`/program/${userID}`);
  }
}

async function buyMembership(req, res) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: {
          name: "1-Month Gym Coach Membership",
        },
        unit_amount: 99.99 * 100,
      },
      quantity: 1,
    }],
    mode: "payment",
    success_url: "http://localhost:3000/membership/success",
    cancel_url: "http://localhost:3000/membership/failure",
  });

  res.redirect(303, session.url);
}

async function getSuccess(req, res, next) {
  let user;
  try {
    user = await User.getUserByID(res.locals.uid);

    user.hasAccess = true;

    const subscriptionDate = new Date();
    subscriptionDate.setMonth(subscriptionDate.getMonth() + 1); //Change subscription to expiry

    user.expiryDate = subscriptionDate;
    
    user.saveAccess();
  } catch (error) {
    return next(error);
  }

  req.session.hasAccess = user.hasAccess;
  req.session.save(function() {
    res.render("success");
  });
}

function getFailure(req, res) {
  res.render("failure");
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
  getUpdateInfo: getUpdateInfo,
  updateInfo: updateInfo,
  buyMembership: buyMembership,
  getSuccess: getSuccess,
  getFailure: getFailure,
  logout: logout,
};
