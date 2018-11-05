var axios = require('axios');
var request = require('request');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
app = express();

app.use(serveStatic(__dirname + "/dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var port = process.env.PORT || 5000;
var host = '0.0.0.0';

app.get('/rooms', function (req, res) {
  var options = {
    url: 'https://api.chatwork.com/v2/rooms',
    headers: {
      'X-ChatWorkToken': 'd7d46e6dd7df5f10331b43fb50bcdd69'
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
      'X-ChatWorkToken': 'd7d46e6dd7df5f10331b43fb50bcdd69'
    }
  };
  request(options, function (error, response, body) {
    res.set({'Content-Type': 'application/json'});
    res.send(body);
  });
});

app.post('/rooms/:id/messages', function (req, res) {
  var options = {
    method: 'POST',
    url: 'https://api.chatwork.com/v2/rooms/' + req.params.id + '/messages',
    headers: {
      'X-ChatWorkToken': 'd7d46e6dd7df5f10331b43fb50bcdd69'
    },
    form: {
      body: req.body.message
    }
  };
  request(options, function (error, response, body) {
    res.set({'Content-Type': 'application/json'});
    res.send(body);
  });
});

app.listen(port, host);
console.log(`Running on http://${host}:${port}`);
