/**
 * Created by haos on 09/02/2017.
 */

import User from '../modules/user';
import List from '../modules/list';
import mongoose from 'mongoose';

const routes = (app) => {
    app.get('/', (request, response) => {
        response.render('../public/index.html');
    });

    app.post('/signup', (req, res) => {
        const data = req.body.data;
        let newUser = {
            first: data.first,
            last: data.last,
            email: data.email,
            phone: data.phone,
            fb: data.fb,
            wechat: data.wechat,
            pw: data.pw,
        };
        const newuser = new User(newUser);
        User.find({email: newUser.email}, (err, result) => {
            if(result[0]) {
                res.json({
                    error: 'Email Already Exist'
                })
            }
            else if (err) {
                res.status(500).json({
                    error:err
                })
            }
            else {
                newuser.save((err) => {
                    if(err) {
                        res.status(500).json({
                            error: err
                        })
                    } else {
                        res.json(newUser[0])
                    }
                })
            }
        });
    });

    app.post('/login', (req, res) => {
        const data = req.body.data.data;
        let loginInfo = {
            email: data.email,
        };
        if (!data) {
            res.status(404).send({
                error: 'user not found'
            })
        }
        else {
            User.find(loginInfo, (err, result) => {
                if (err) {
                    res.status(500).json({
                        error: err
                    })
                }
                else if (!result[0]) {
                    res.status(404).send({
                        error: 'user not found'
                    })
                }
                else if (data.email !== result[0].email) {
                    res.status(403).json({
                        error: err,
                        message: 'Password does not match'
                    })
                }
                else {

                    res.json(result)
                }
            })
        }

    });

    app.post('/create', (req, res) => {
        const data = req.body.data.data;
        let loginInfo = {
            date: data.date,
            time: data.time,
            location: data.location,
            fare: data.sharedFare,
            author: data.email,
            email: data.contact.emal,
            name: data.contact.name,
            phone: data.contact.phone,
            wechat: data.contact.wechat,
            fb: data.contact.fb,
        };
        const newList = new List(loginInfo);
        newList.save((err) => {
            if(err) {
                res.status(500).json({
                    error: err
                })
            } else {
                res.json(loginInfo)
            }
        })
    });

    app.get('/list', (req,res) => {
        List.find({}, (err, result) => {
            if (err) {
                res.status(500).json({
                    error: err
                })
            }
            else {
                let listMap = {};
                result.forEach((item) => {
                    listMap[item._id] = item;
                });
                res.send(listMap)
            }
        })
    });

    app.post('/del', (req, res) => {
        const data = req.body.data;

        const toSearch = {
            _id: mongoose.Types.ObjectId(data._id)
        };
        List.find(toSearch).remove((err, result) => {
            // console.log(err, result)
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send(result);
            }
        })
    });
};

module.exports = routes;