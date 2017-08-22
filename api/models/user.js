const bookshelf = require('./bookshelf');

/* USER TABLE SCHEMA
  email: String
  password-digest: String. hash encrypted password
*/
const User = bookshelf.Model.extend({
  tableName: 'users',
  hasSecurePassword: 'password-digest'
})

module.exports = User;
