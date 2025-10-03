const session = require("express-session");

const sessionMiddleware = session({
  secret: "piska",
  resave: true,
  saveUninitialized: true,
});

module.exports = sessionMiddleware;
