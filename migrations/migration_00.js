exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username');
      table.string('password-digest');
    })
    .createTable('focuses', function(table) {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('resources', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('url');
    })
    .createTable('todos', function(table) {
      table.increments('id').primary();
      table.string('text');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('todos')
    .dropTable('resources')
    .dropTable('focuses')
    .dropTable('users');
};
