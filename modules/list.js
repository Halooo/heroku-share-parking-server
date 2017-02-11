/**
 * Created by haos on 10/02/2017.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create schema
const ListInfo = new Schema({
    date: String,
    time: String,
    location: String,
    fare: Number,
    author: String,
});

// create model
const List = mongoose.model('list', ListInfo);

module.exports = List;

