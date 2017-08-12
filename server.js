var express = require('express');  
var request = require('request');
var body_parser = require('body-parser');

var app = express();  

//app.use(body_parser.json());

app.use('/',express.static(__dirname + '/build'));

app.use('/go', function(req, res) {  
  var url = "https://dashboard.meraki.com" + req.url;
  console.log(url);
  console.log(req.method);
  console.log(req.body);
  req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 3001);  



