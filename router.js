var
  routes = require('./routes')
, util = require('util')
, router = {}
;

router.init = function(app){
  //Messages
  app.get('/v1/:id/messages/:tag', routes.v1.messages.get);
};

module.exports = router;