const config = require('../../config.js');
var env = process.env.NODE_ENV || 'development';
const knex = require('knex')(config.databaseConfig[env]);
module.exports = knex;
