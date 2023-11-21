const expressSession = require("express-session");
const mongoStore = require("connect-mongodb-session");

function createSessionStore() {
  const MongoStore = mongoStore(expressSession);

  const store = new MongoStore({
    uri: "mongodb://127.0.0.1:27017",
    databaseName: "gym-coach",
    collection: "sessions"
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: "session-secret-key",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2
    }
  };
}

module.exports = createSessionConfig;