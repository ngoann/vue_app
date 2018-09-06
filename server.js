var axios = require('axios');
var request = require('request');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var port = process.env.PORT || 5000;

app.get('/rooms', function (req, res) {
  var options = {
    url: 'https://api.chatwork.com/v2/rooms',
    headers: {
      'X-ChatWorkToken': req.query.token
    }
  };
  request(options, function (error, response, body) {
    res.set({'Content-Type': 'application/json'});
    res.send(body);
  });
});

app.get('/rooms/:id/members', function (req, res) {
  var options = {
    url: 'https://api.chatwork.com/v2/rooms/' + req.params.id + '/members',
    headers: {
      'X-ChatWorkToken': req.query.token
    }
  };
  request(options, function (error, response, body) {
    res.set({'Content-Type': 'application/json'});
    res.send(body);
  });
});

app.listen(port);
console.log('server started '+ port);
