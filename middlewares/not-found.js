function notFound(req, res, next) {
  res.status(404).render("404");
  next();
}

module.exports = notFound;