var
  // App Dependencies
  util = require('util')
, context = require('../../context')

  // Module variables
, messages =  {}
;

messages.get = function (req, res){
  context.accounts(req.params.id).messages().get(
    {
      folder: req.params.folder
    , include_body: 1
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
        , body: message.body[0].content
        })
      }
      //console.log(util.inspect(response.body, false, null, true));
      res.json(results);
    }
  );
};

module.exports = messages;