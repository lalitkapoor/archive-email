var
  // App Dependencies
  util = require('util')
, sanitize = require('validator').sanitize
, context = require('../../context')

  // Module variables
, messages =  {}
;

messages.list = function (req, res){
  context.accounts(req.params.id).messages().get(
    {
      folder: req.query.folder || req.query.tag
    , include_body: 1
    , include_flags: 1
    , limit: req.query.limit || 25
    , offset: req.query.offset || 0
    }
  , function(err, response){
      var results = [];
      if (err){
        console.log(util.inspect(err, false, null, true));
        res.json([]);
        return;
      }
      for(var i=0; i<response.body.length; i++){
        var message = response.body[i];
        results.push({
          to: message.addresses.to
        , from: message.addresses.from
        , fromDomain: message.addresses.from.email.match(/@(\w*)\./)[2]
        , subject: message.subject
        , messageId: message.message_id
        , date: new Date(message.date*1000)
        , body: sanitize(message.body[0].content.replace(/(\r\n|\n|\r)/gm,"").replace(/(\t)/gm, " ")).trim().substr(0, 140)
        , read: (message.flags && message.flags[0] != null && message.flags[0] === '\\Seen') ? true : false
        , labels: message.folders
        , tumbnails: message.personal_info
        , files: message.files
        });
      }
      //console.log(util.inspect(response.body, false, null, true));
      res.json(response.body);
    }
  );
};

messages.get = function(req, res) {
  context.accounts(req.params.id).messages(req.params.messageId).body().get(
    {
      type: 'text/html'
    }
  , function(err, response){
      //console.log(util.inspect(response.body, false, null, true));
      res.send(response.body[0].content);
    }
  );
};

module.exports = messages;