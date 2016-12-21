'use strict';
(function() {

  var app = require('./app');
  var config = require('./config');

  var port = config.Port;
  app.listen(port, function(){
    console.log('Listening on port ' + port);
  });
})();

