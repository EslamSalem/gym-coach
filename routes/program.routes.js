const express = require("express");

const router = express.Router();

router.get("/", function(req, res) {  // /program
  res.render("client/program");
});

module.exports = router;