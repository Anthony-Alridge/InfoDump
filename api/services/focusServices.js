const User = require('../models/user');
const Focus = require('../models/focus');

exports.getFocus = function(focus_id)  {
  var focusSummary = {};
   return Focus.forge({id:  focus_id})
    .fetch({withRelated: ['focus']})
    .then(function(focus) {
      focusSummary.name = focus.get('name');
      focusSummary.child_focuses = [];
      focus.related('focus').forEach(function (child) {
        focusSummary.child_focuses.push({name: child.get('name')});
      });
      /*
      console.log(focus_id);
      console.log(focusSummary);
      */
      return Promise.resolve(focusSummary);
    })
    .catch(function(err) {
      console.log(err.message);
      return Promise.reject(err);
    });
};

exports.createRootFocus = function (user_id) {
  var root= new Focus({user_id: user_id, name:'root'});
  return root.save();
}

exports.createFocus = function(parentId, name) {
  var focus = new Focus({focus_id: parentId, name:name});
  return focus.save();
};
