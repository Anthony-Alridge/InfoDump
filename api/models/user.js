const bookshelf = require('./bookshelf');
const Focus = require('./focus');
/* USER TABLE SCHEMA
  email: String
  password-digest: String. hash encrypted password
*/
const User = bookshelf.Model.extend({
  tableName: 'users',
  hasSecurePassword: 'password-digest',
  focus: function() {
    return this.hasOne(Focus);
  }
})

module.exports = User;
