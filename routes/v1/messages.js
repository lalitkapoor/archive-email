var
  // App Dependencies
  context = require('../../context')

  // Module variables
, messages =  {}
;

messages.get = function (req, res){
  context.accounts(req.params.id).messages().get(
    {folder: req.params.folder}
  , function(err, response){
      console.log(util.inspect(response.body, false, null, true));
    }
  );
};