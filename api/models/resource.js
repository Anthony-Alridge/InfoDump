const bookshelf = require('./bookshelf');

const Resource = bookshelf.Model.extend({
  tableName: 'resources'
});

module.exports = Resource;
