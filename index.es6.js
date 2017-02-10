/**
 * Created by haos on 09/02/2017.
 */
import express from 'express';
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// database config
var mongoose = require('mongoose');
var UserInfo = require('./modules/user.js');


var routes = require('./routes/index');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

routes(app);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


