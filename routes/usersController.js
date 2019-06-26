// Imports
let bcrypt = require('bcrypt');
let jwtUtils = require('../utils/jwt.util');
let models = require('../models');
let asyncLib = require('async');

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
const NAME_REGEX = /^[a-z ,.'-]+$/i;
// Routes
module.exports = {
    register: function(req, res) {
        // Params
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let team = req.body.team;

        if(firstname == null || lastname == null || username == null || email == null || password == null || team == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        if(username.length >= 13 || username.length <= 4) {
            return res.status(400).json({ 'error': 'wrong username (must be 5 to 12 characters)' });
        }

        if(!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': 'email is not valid' });
        }

        if(!NAME_REGEX.test(firstname)) {
            return res.status(400).json({ 'error': 'Not valid first name' });
        }

        if(!NAME_REGEX.test(lastname)) {
            return res.status(400).json({ 'error': 'Not valid last name' });
        }

        if(!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'error': 'invalid password (must be between 4-8 characters and include atleast 1 number)' });
        }

        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
            .then(function (userFound) {
                if(!userFound) {
                    bcrypt.hash(password, 5, function ( err, bcryptedPassword ) {
                        let newUser = models.User.create({
                            firstname: firstname,
                            lastname: lastname,
                            username: username,
                            email: email,
                            password: bcryptedPassword,
                            isAdmin: 0,
                            team: team,
                        })
                            .then(function (newUser) {
                                return res.status(201).json({
                                    'userId': newUser.id,
                                })
                            })
                            .catch(function (err) {
                                return res.status(500).json({ 'error': 'Cannot add user' });
                            });
                    });
                } else {
                    return res.status(409).json({ 'error': 'User already exists' });
                }
            })
            .catch(function (err) {
                return res.status(500).json({ 'error': 'unable to verify user' });
            })
    },
    login: function(req, res) {
        // Params
        let email = req.body.email;
        let password = req.body.password;

        if(email == null || password == null) {
            return res.status(400).json({ 'error': 'Missing parameters' });
        }

        if(!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': 'email is not valid' });
        }

        if(!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'error': 'invalid password (must be between 4-8 characters and include atleast 1 number)' });
        }

        models.User.findOne({
            where: { email: email }
        })
            .then(function (userFound) {
                let {id, firstname, lastname, isAdmin, email, team, username } = userFound
                if (userFound) {
                    bcrypt.compare(password, userFound.password, function (errBcrypt, resBcrypt) {
                        if(resBcrypt) {
                            return res.status(200).json({
                                'userId': id,
                                'firstname': firstname,
                                'lastname': lastname,
                                'username': username,
                                'email': email,
                                'team': team,
                                'isAdmin': isAdmin,
                                'token': jwtUtils.generateTokenForUser(userFound),

                            });
                        } else {
                            return res.status(403).json({ 'error': 'invalid password' });
                        }
                    });
                } else {
                    return res.status(400).json({ 'error': 'user does not exist' });
                }
            })
            .catch(function (err) {
                return res.status(500).json({ 'error': 'unable to verify user' });
            })
    },
    getUserProfile: function(req, res) {
        // Getting auth header
        let headerAuth = req.headers['authorization'];
        let userId = jwtUtils.getUserId(headerAuth);

        if(userId < 0) return rest.status(400).json({ 'error': 'wrong token' });

        models.User.findOne({
            attributes: ['id', 'email', 'username', 'team', 'followed_matches'],
            where: { id: userId }
        })
            .then(function (user) {
                if (user) {
                    res.status(201).json(user);
                } else {
                    res.status(401).json({ 'error': 'user not found' });
                }
            })
            .catch(function (err) {
                res.status(500).json({ 'error': 'cannot fetch user' });
            });
    },
    updateUserProfile: function (req, res) {
        // Getting auth header
        let headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId((headerAuth));

        // Params
        var email = req.body.email;

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    attributes: ['id', 'email'],
                    where: { id: userId }
                }).then(function (userFound) {
                    done(null, userFound);
                })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            function(userFound, done) {
                if(userFound) {
                    userFound.update({
                        email: (email ? email : userFound.email)
                    }).then(function() {
                        done(userFound);
                    }).catch(function(err) {
                        res.status(500).json({ 'error': 'cannot update user' });
                    });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], function(userFound) {
            if (userFound) {
                return res.status(201).json(userFound);
            } else {
                return res.status(500).json({ 'error': 'cannot update user profile' });
            }
        });
    },

    updateUserStatus: function (req, res, next) {
        // Getting auth header
        let isAdmin = req.body.isAdmin;
        let userId = req.params.id;

        models.User.update(
          {isAdmin: req.body.isAdmin},
          {returning: true, where: {id: userId} }
        )
        .then(function(updatedStatusUser) {
          res.json(updatedStatusUser)
        })
        .catch(next)
      },

      listUsers: function (req, res){
        models.sequelize.query("SELECT * FROM `users`", {
            model: models.User,
        })
        .then(function (allUsers) {
            if (allUsers) {
                res.status(200).json(allUsers);
            } else {
                res.status(404).json({ 'error': 'no users found' });
            }
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({ 'error': 'invalid fields' });
        })
      }
};
