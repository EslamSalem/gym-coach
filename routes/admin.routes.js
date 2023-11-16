const express = require("express");

const router = express.Router();

router.get("/users", function(req, res) {  // /admin/users
  res.render("admin/manage-users");
});

module.exports = router;