const express = require("express");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");

const db = require("./data/database");
const createSessionConfig = require("./utility/session-config");
const { doubleCsrfProtection } = require("./utility/csrf-config");
const addCSRFToken = require("./middlewares/csrf-token");
const checkAuthentication = require("./middlewares/check-authentication");
const checkAccess = require("./middlewares/check-access");
const protectRoutes = require("./middlewares/protect-routes");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");
const baseRoutes = require("./routes/base.routes");
const programRoutes = require("./routes/program.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cookieParser());
app.use(expressSession(createSessionConfig()));
app.use(doubleCsrfProtection);

app.use(addCSRFToken);
app.use(checkAuthentication);
app.use(checkAccess);

app.use(baseRoutes);
app.use(protectRoutes);
app.use("/program", programRoutes);
app.use("/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

db.connectToDB().then(function() {
  app.listen(3000);
}).catch(function(error) {
  console.log("Failed to connect to database!");
  console.log(error);
});