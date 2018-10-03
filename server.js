var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var morgan = require('morgan');
var logger = require('http-logger');

var express = require('express');
var app = express();

app.set('port', 80);

var documentRoot = require('path').resolve(__dirname);

app.use(morgan('combined'));
app.use(serveIndex(documentRoot));
app.use(serveStatic(documentRoot));

app.listen(
  app.get('port'),
  function() {
    console.log('Express server listening on port ' + app.get('port'));
  }
);
