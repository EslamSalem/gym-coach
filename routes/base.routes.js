const express = require("express");

const baseController = require("../controllers/base.controller");

const router = express.Router();

router.get("/", baseController.getHome);

router.get("/signup", baseController.getSignup);

router.post("/signup", baseController.signup);

router.get("/login", baseController.getLogin);

router.post("/login", baseController.login);

router.get("/expired", baseController.getExpired);

router.get("/logout", baseController.logout);

module.exports = router;