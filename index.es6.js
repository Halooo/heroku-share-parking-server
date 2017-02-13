/**
 * Created by haos on 09/02/2017.
 */
import express from 'express';
let app = express();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from "path";

// database config
import mongoose from 'mongoose';
import UserInfo from './modules/user.js';


import routes from './routes/index';

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/* enable cors */
app.use(cors());
console.log('CORS enabled');
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));


// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

routes(app);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


