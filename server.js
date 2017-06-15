var express = require('express');  
var request = require('request');

var app = express();  

app.use('/',express.static(__dirname + '/public'));

app.use('/go', function(req, res) {  
  var url = "https://dashboard.meraki.com" + req.url;
  console.log(url);
  req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 3000);  



