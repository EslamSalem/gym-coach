function protectRoutes(req, res, next) {
  if (!res.locals.isAuthenticated) {
    return res.status(401).render("401");
  }

  if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
    return res.status(401).render("403");
  }

  next();
}

module.exports = protectRoutes;