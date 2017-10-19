var express = require('express');  
var request = require('request');
//request.debug = true;

var body_parser = require('body-parser');
var proxy = require('http-proxy-middleware');

var app = express();  


app.use('/',express.static(__dirname + '/build'));

//////////////////////////////////////
// OLD MANUAL PROXY
//////////////////////////////////////
app.use('/go', function(req, res) {  
  var url = "https://dashboard.meraki.com" + req.url;

  console.log(url);
  console.log(req.method);
  console.log(req.body);

  req.pipe(request(url)).pipe(res);

  // req.pipe(
  //   request({
  //     url: url,
  //     followAllRedirects: true,
  //     followOriginalHttpMethod: true
  //   })
  // ).pipe(res);
});

app.listen(process.env.PORT || 3001);  



