/**
 * Created by haos on 09/02/2017.
 */

import User from '../modules/user';
import List from '../modules/list';

const routes = (app) => {
    app.get('/', (request, response) => {
        response.render('pages/index');
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
        };
        const newuser = new User(newUser);
        User.find({email: newUser.email}, (err, result) => {
            if(result) {
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
        const data = req.body.data;
        let loginInfo = {
            email: data.email,
        };
        User.find(loginInfo, (err, result) => {
            if (err) {
                res.status(500).json({
                    error: err
                })
            }
            else if (data.pw !== result.pw) {
                res.status(403).json({
                    error: err,
                    message: 'Password does not match'
                })
            }
            else {
                res.json(result)
            }
        })
    });

    app.post('/create', (req, res) => {
        const data = req.body.data.data;
        let loginInfo = {
            date: data.date,
            time: data.time,
            location: data.location,
            fare: data.sharedFare,
            author: data.email,
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
        const data = req.body.data;

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

    app.get('/list/:id', (req,res) => {

    })
};

module.exports = routes;