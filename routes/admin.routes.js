const express = require("express");

const router = express.Router();

router.get("/users", function(req, res) {  // /admin/users
  res.render("admin/manage-users");
});

router.get("/logs", function(req, res) {  // /admin/logs
  res.render("admin/manage-logs");
});

router.get("/nutrition", function(req, res) {  // /admin/nutrition
  res.render("admin/manage-nutrition");
});

module.exports = router;