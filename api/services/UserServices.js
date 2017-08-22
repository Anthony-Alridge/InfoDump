const User = require('../models/user');

/**
 * Sign up a new user.
 *
 * @returns {Promise.<User>} A promise resolving to the newly registered User, or rejected with an error.
 */
var create = function(email, password) {
  let user = new User({ email: email, password: password })

  return user.save()
};

/**
 * Sign in with a given email, password combination
 *
 * @returns {Promise.<User>} A promise resolving to the authenticated User, or rejected with a `PasswordMismatchError`.
 */
var authenticate = function(email, password) {
  return User.forge({ email: email })
    .fetch()
    .then(function (user) {
      return user.authenticate(password)
    })
};

exports.create = create;
exports.authenticate = authenticate;
