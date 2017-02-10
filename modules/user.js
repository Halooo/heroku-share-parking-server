/**
 * Created by haos on 09/02/2017.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

mongoose.connect('mongodb://share-parking:' + 'share-parking' + '@ds147979.mlab.com:47979/share-parking');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (cb) {
    console.log('DB connection established');
});

// create schema
const UserInfo = new Schema({
    first: String,
    last: String,
    email: String,
    phone: String,
    fb: String,
    wechat: String
});

// create model
const users = mongoose.model('newClass', UserInfo);

module.exports = users;

