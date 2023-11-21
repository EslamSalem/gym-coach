function addUserAuthentication(req, user, action) {
  req.session.uid = user.id;
  req.session.hasAccess = user.hasAccess;
  req.session.isAdmin = user.isAdmin;
  req.session.save(action);
}

function removeUserAuthentication(req) {
  req.session.uid = null;
}

module.exports = {
  addUserAuthentication: addUserAuthentication,
  removeUserAuthentication: removeUserAuthentication,
};