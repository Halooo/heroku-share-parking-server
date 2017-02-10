/**
 * Created by haos on 09/02/2017.
 */

import User from '../modules/user';

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
        newuser.save((err) => {
            if(err) {
                res.status(500).json({
                    error: err
                })
            } else {
                res.json(newUser[0])
            }
        })
    });

    app.post('/login', (req, res) => {
        const data = req.body.data;
        let loginInfo = {
            email: data.email,
            pw: data.pw
        };
        User.find(loginInfo, (err, result) => {
            if (err) {
                res.status(500).json({
                    error: err
                })
            }
            // else if (data.pw !== result.pw) {
            //     res.status(403).json({
            //         error: err,
            //         message: 'Password does not match'
            //     })
            // }
            else {
                res.json(result)
            }
        })
    });

    app.post('/create', (req, res) => {
        const data = req.body.data;
        let loginInfo = {
            email: data.email,
            pw: data.pw
        };
        User.find(loginInfo, (err, result) => {
            if (err) {
                res.status(500).json({
                    error: err
                })
            } else {
                res.json(result)
            }
        })
    });

    app.get('/list', (req,res) => {

    });

    app.get('/list/:id', (req,res) => {

    })
};

module.exports = routes;