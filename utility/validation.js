function isEmpty(value) {
  return !value || value.trim() === "";
}

function credentialsValid(userData) {
  return (
    !isEmpty(userData.name) &&
    !isEmpty(userData.email) &&
    !isEmpty(userData.password) &&
    !isEmpty(userData.phone) &&
    userData.password.trim().length >= 8 &&
    userData.email.includes("@") &&
    userData.image
  );
}

module.exports = credentialsValid;