const User = require('../models/user');
const focusServices = require('./focusServices');
/**
 * Sign up a new user.
 *
 * @returns {Promise.<User>} A promise resolving to the newly registered User, or rejected with an error.
 */
 var create = function(username, password) {
   console.log('creating user');
   return User.forge({username: username})
   .fetch()
   .then(function(user) {
     if (!user) {
       user = new User({username: username, password: password});
       return user.save()
         .then(function(user) {
           return focusServices.createRootFocus(user.id)
             .then(function(root) {
               return Promise.resolve({id: root.get('user_id'), root_id: root.id});
             });
         });
     }
     console.log('name taken');
      var error = new Error("UsernameTakenError");
      error.name = "UsernameTakenError";
      return Promise.reject(error);
   })
 };

/**
 * Sign in with a given username, password combination
 *
 * @returns {Promise.<User>} A promise resolving to the authenticated User, or rejected with a `PasswordMismatchError`.
 */
var authenticate = function(username, password) {
  return User.forge({ username: username })
    .fetch()
    .then(function (user) {
      return user.authenticate(password)
    })
};



var updateFocus = function(focusId, properties) {
  return Focus
    .forge({id: focusId})
    .fetch()
    .then(function(focus) {
      return focus.save(properties);
    })
};





exports.create = create;
exports.authenticate = authenticate;
