const express = require("express");
const expressSession = require("express-session");
const csrf = require("csrf-csrf");
const path = require("path");

const db = require("./data/database");
const createSessionConfig = require("./utility/session-config");
const addCSRFToken = require("./middlewares/csrf-token");
const checkAuthentication = require("./middlewares/check-authentication");
const baseRoutes = require("./routes/base.routes");
const programRoutes = require("./routes/program.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.use(expressSession(createSessionConfig()));
// app.use(csrf());

// app.use(addCSRFToken);
app.use(checkAuthentication);

app.use(baseRoutes);
app.use("/program", programRoutes);
app.use("/admin", adminRoutes);

db.connectToDB().then(function() {
  app.listen(3000);
}).catch(function(error) {
  console.log("Failed to connect to database!");
  console.log(error);
});