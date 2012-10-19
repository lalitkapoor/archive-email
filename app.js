var
  util = require('util')
, express = require('express')
, app = express()
, router = require('./router')
// , config = require('./config')
;

app.configure(function(){
  app.set('port', 1338);
  app.use(express.bodyParser());
  app.use(express.cookieParser());

  app.use(app.router);
});

router.init(app);

http.createServer(app).listen(app.get('port')), function(){
  console.log("server started on port " + app.get('port'));
});