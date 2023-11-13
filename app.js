const express = require("express");
const path = require("path");

const baseRoutes = require("./routes/base.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.use(baseRoutes);

app.listen(3000);