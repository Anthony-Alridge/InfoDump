var root_focus = {
  name: 'root'
};

const createUser = function() {

};

exports.seed = function(knex, Promise) {
  // populate seed data
  // FORMAT -- for each address above there is a
  // bedroom in the range 1 -10 bedrooms.
  // for each of these bedrooms there is a proeprty
  // priced in the range bedNum * 100 + (10,20...90)
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => knex('focuses').del())
    .then(function() {
      return knex('users').insert({
        username: 'user',
        'password-digest': 'password'
      }).then(function(id) {
        return knex('focuses').insert({
          name:'root',
          user_id: id
        }).then(function(id) {
            return knex('focuses') .insert({
                name:'root_child',
                focus_id: 1
            })
            .then(function(id) {
              return knex('resources').insert({
                name:'test',
                url:'www.testurl.com',
                focus_id: 1
              })
            });
          })
      });
    });
};
