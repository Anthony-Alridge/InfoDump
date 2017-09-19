exports.up = function(knex) {
  return knex.schema.table('focuses', function(p) {
     p.integer('user_id').unsigned().unique();
     p.foreign('user_id').references('users.id');
     p.integer('focus_id').unsigned();
     p.foreign('focus_id').references('focuses.id');
  });
};

exports.down = function(knex) {
    return knex.schema.table('focuses', function(t) {
      t.dropForeign('focus_id').dropForeign('user_id');
       t.dropColumn('focus_id').dropColumn('user_id');
  });
};
