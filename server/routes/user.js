// Packages
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');

// Models
const User = require('../models/user');

app.get('/users/', (req, res) => {

    let range = req.query.range || 0;
    range = Number(range);

    let limit = req.query.limit || User.count({
        status: true
    });
    limit = Number(limit);


    // *** Example Of As Send Parameters In API ***
    // http://localhost:3000/users?range=5&limit=2

    User.find({
            status: true
        })
        .skip(range) // Skip the next registers
        .limit(limit) // Get registers range 
        .exec((err, users) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({
                status: true
            }, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    counts: count
                });
            });

        });
});

app.post('/user', (req, res) => {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        })
    });

});

app.put('/user/:id', (req, res) => {

    let id = req.params.id;

    let parameters_user = [
        'name',
        'email',
        'img',
        'role',
        'status'
    ];

    let body = _.pick(req.body, parameters_user);

    delete body.password;
    delete body.google;

    User.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
        context: 'query'
    }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            body
        });

    });
});

app.delete('/user/:id', (req, res) => {

    let id = req.params.id;

    let ChangeData = {
        status: false
    }

    User.findByIdAndUpdate(id, ChangeData, (err, userDelete) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!userDelete) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }

        res.json({
            ok: true,
            user: userDelete
        })

    });



});

module.exports = app;