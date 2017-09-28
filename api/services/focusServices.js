const User = require('../models/user');
const Focus = require('../models/focus');
const Resource = require('../models/resource');

exports.getFocus = function(focus_id)  {
  var focusSummary = {};
   return Focus.forge({id:  focus_id})
    .fetch({withRelated: ['focus', 'resource']})
    .then(function(focus) {
      focusSummary.name = focus.get('name');
      focusSummary.id = focus_id;
      focusSummary.child_focuses = [];
      focusSummary.resources = [];
      focus.related('focus').forEach(function(child) {
        focusSummary.child_focuses.push({name: child.get('name'), id:child.id});
      });
      focus.related('resource').forEach(function(child) {
        focusSummary.resources.push({name: child.get('name'), url:child.get('url'),  id:child.id});
      });
      return Promise.resolve(focusSummary);
    })
    .catch(function(err) {
      return Promise.reject(err);
    });
};

exports.getRootFocusId = function (user_id) {
  return Focus.forge({user_id:user_id})
    .fetch()
    .then((focus) => Promise.resolve(focus.id))
    .catch((err) => Promise.reject(err));
};

exports.createRootFocus = function (user_id) {
  var root= new Focus({user_id: user_id, name:'root'});
  return root.save();
}

exports.createFocus = function(parentId, name) {
  var focus = new Focus({focus_id: parentId, name:name});
  return focus.save();
};

exports.createResource = function (name, url, focusId) {
   var resource = new Resource({name:name, url:url, focus_id:focusId});
   return resource.save();
}
