const express = require("express");

const router = express.Router();

router.get("/users", function(req, res) {  // /admin/users
  res.render("admin/manage-users");
});

router.get("/logs", function(req, res) {  // /admin/logs
  res.render("admin/manage-logs");
});

router.get("/logs/workouts", function(req, res) {  //  /admin/logs/workouts
  res.render("admin/workouts-collection");
});

router.get("/nutrition", function(req, res) {  // /admin/nutrition
  res.render("admin/manage-nutrition");
});

router.get("/logs/update", function(req, res) {  // /admin/logs/update
  res.render("admin/update-logs");
});

router.get("/nutrition/update", function(req, res) {  // /admin/nutrition/update
  res.render("admin/update-nutrition");
});

module.exports = router;