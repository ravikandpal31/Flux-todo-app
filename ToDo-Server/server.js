var express = require('express');
//var app = express.Router();
var app = express();

var path = require('path');

var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost/toddDb';
mongoose.connect(connectionString);

//app.use('/',express.static(path.join(__dirname,'public')));

var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT');
    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var todoRoutes = require('./routes/todos');
app.use('/api',todoRoutes);

app.listen(3000,function(req,res){
	console.log('Server is listening at 3000...')
});

module.exports = app;