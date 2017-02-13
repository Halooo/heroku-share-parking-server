/**
 * Created by haos on 09/02/2017.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const dbAddr = 'mongodb://share-parking:' + 'share-parking' + '@ds147979.mlab.com:47979/share-parking';
const testdb = 'mongodb://localhost:27017/share-parking';
mongoose.connect(dbAddr);
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
const User = mongoose.model('user', UserInfo);

module.exports = User;

