var
  routes = require('./routes')
, util = require('util')
, router = {}
;

router.init = function(app){
  app.all('*', function(req, res, next){
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.header('Access-Control-Allow-Origin', res.req.headers['origin']);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');

    next();
  });
  //Messages
  app.get('/v1/:id/messages/:tag', routes.v1.messages.get);
};

module.exports = router;