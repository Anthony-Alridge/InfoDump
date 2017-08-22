const securePassword = require('bookshelf-secure-password');
var knex = require('./knex');
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin(securePassword);
// Export the bookshelf instance to make it available across the app.
module.exports = bookshelf;
