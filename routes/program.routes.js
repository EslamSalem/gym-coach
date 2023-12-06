const express = require("express");

const programController = require("../controllers/program.controller");

const router = express.Router();

router.get("/:id", programController.getProgram); // /program/userID

router.get("/:id/updateInfo", programController.getUpdateInfo); // /program/userID/updateInfo

router.post("/:id/updateInfo", programController.updateInfo); // /program/userID/updateInfo

module.exports = router;