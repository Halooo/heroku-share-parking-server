/**
 * Created by haos on 09/02/2017.
 */
import express from 'express';
let app = express();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from "path";

// database config
import mongoose from 'mongoose';
import UserInfo from './modules/user.js';


import routes from './routes/index';

app.set('port', (process.env.PORT || 5000));
const staticPath = path.join(__dirname, 'public');
console.log("static added",staticPath)
// app.use(express.static(staticPath));
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/* enable cors */
console.log('CORS enabled');

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

routes(app);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


