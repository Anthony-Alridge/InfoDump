exports.up = function(knex) {
  return knex.schema.table('resources', function(p) {
     p.integer('focus_id').unsigned();
     p.foreign('focus_id').references('focuses.id');
  });
};

exports.down = function(knex) {
    return knex.schema.table('resources', function(t) {
       t.dropForeign('focus_id');
       t.dropColumn('focus_id');
  });
};
