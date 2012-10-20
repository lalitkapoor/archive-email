var
  // App Dependencies
  util = require('util')
, sanitize = require('validator').sanitize
, context = require('../../context')

  // Module variables
, messages =  {}
;

messages.get = function (req, res){
  context.accounts(req.params.id).messages().get(
    {
      folder: req.params.folder
    , include_body: 1
    , include_flags: 1
    }
  , function(err, response){
      var results = [];
      for(var i=0; i<response.body.length; i++){
        var message = response.body[i];
        results.push({
          from: message.addresses.from
        , to: message.addresses.to
        , subject: message.subject
        , message_id: message.message_id
        , date: new Date(message.date*1000)
        , body: sanitize(message.body[0].content.replace(/(\r\n|\n|\r)/gm,"").replace(/(\t)/gm, " ")).trim().substr(0, 140)
        , read: (message.flags && message.flags[0] != null && message.flags[0] === '\\Seen') ? true : false
        , labels: message.folders
        });
      }
      //console.log(util.inspect(response.body, false, null, true));
      res.json(results);
    }
  );
};

module.exports = messages;