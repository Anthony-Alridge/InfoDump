var createTable = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('email');
      table.string('password-digest');
    });
};

var dropTable = function(knex) {
  return knex.schema
    .dropTable('users');
};

exports.up = createTable;
exports.down = dropTable;
