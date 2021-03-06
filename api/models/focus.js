const bookshelf = require('./bookshelf');
const Resource = require('./resource');
/* FOCUS TABLE SCHEMA
  name: String
  user_id:
  parent_focus_id:
*/
const Focus = bookshelf.Model.extend({
  tableName: 'focuses',
  focus: function() {
    return this.hasMany(Focus, 'focus_id');
  },
  resource: function () {
    return this.hasMany(Resource, 'focus_id');
  }
});

module.exports = Focus;
