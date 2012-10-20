var
  // Dependencies
  util = require('util')
, context = require('../context')
, redis = require('redis').createClient()
, accounts = require('./accounts.json')

, counter = 0
, limit = 50
, offset = 0
;


// var cron = function(){
//   // Get messages for all accounts
//   var accounts = JSON.parse(fs.readFileSync('./accounts.json', 'utf8'));
//   for (var i=0; i<accounts.length; i++){
//     fetch(accounts[i], 0);
//   }
// }

for (var i=0; i<accounts.length; i++){
  fetch(accounts[i], 1);
}


function fetch(accountId, attempt){
  console.log("attempt #"+attempt);
  if(attempt>2){
    console.log("attempted to fetch data 3 times now -- something is wrong with context.io");
    return;
  }
  context.accounts(accountId).messages().get(
    {
      folder: 'Inbox'
    , include_body: 1
    , include_flags: 1
    , limit: limit
    , offset: offset
    }
  , function(err, response) {
      if (err){
        console.log(util.inspect(err, false, null, true));
        fetch(accountId, attempt++);
        console.log("retrying due to error");
        return;
      }
      redis.del("messages-"+accountId);
      for(var i=0; i<response.body.length; i++){
        var message = response.body[i];

        // should probably push all in as a transaction
        redis.rpush("messages-"+accountId, JSON.stringify(message), function(error, replies){
          counter++;
          if(counter>=limit)
            process.exit(0);
          //console.log(util.inspect(replies, false, null, true));
        });
      }
      //console.log(util.inspect(response.body, false, null, true));
    }
  );
}