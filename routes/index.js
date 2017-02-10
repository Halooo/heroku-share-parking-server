/**
 * Created by haos on 09/02/2017.
 */

import users from '../modules/user';

const routes = (app) => {
    app.get('/', (request, response) => {
        response.render('pages/index');
    });

    app.post('/signup', (req, res) => {
        const data = req.body;
        let newUser = [{
            first: data.first,
            last: data.last,
            email: data.email,
            phone: data.phone,
            fb: data.fb,
            wechat: data.wechat,
        }];
        users.create(newUser, (err) => {
            if(err) return console.log(err);
            res.send("<a href='/'>Success! You have signed up, click to continue</a>")
        })
    })
};

module.exports = routes