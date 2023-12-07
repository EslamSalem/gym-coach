const express = require("express");

const baseController = require("../controllers/base.controller");

const router = express.Router();

router.get("/", baseController.getHome);

router.get("/signup", baseController.getSignup);

router.post("/signup", baseController.signup);

router.get("/login", baseController.getLogin);

router.post("/login", baseController.login);

router.post("/membership", baseController.buyMembership);

router.get("/membership/success", baseController.getSuccess);

router.get("/membership/failure", baseController.getFailure);

router.post("/logout", baseController.logout);

module.exports = router;