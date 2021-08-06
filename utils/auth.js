const withAuth = (req, res, next) => {
 console.log(req.session)
  if (req.session.logged_in === false) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
