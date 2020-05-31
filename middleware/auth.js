module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/api/users/login");
};
