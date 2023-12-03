const express = require("express");

const programController = require("../controllers/program.controller");

const router = express.Router();

router.get("/:id", programController.getProgram); // /program/userID

module.exports = router;