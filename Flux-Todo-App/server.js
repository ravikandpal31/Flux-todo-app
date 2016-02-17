var express = require('express');
//var app = express.Router();
var app = express();

var path = require('path');

app.use('/',express.static(path.join(__dirname,'public')));

app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.listen(3001,function(req,res){
	console.log('Client Server is listening at 3001...')
});

module.exports = app;