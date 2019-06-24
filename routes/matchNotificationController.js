// Imports
let models = require('../models');
let asyncLib = require('async');
let jwtUtils = require('../utils/jwt.util');
// Getting auth header


module.exports = {
    createNotification: function (req, res) {
        let headerAuth = req.headers['authorization'];
        let userId = jwtUtils.getUserId(headerAuth);

        // Params
        let isFavorite = req.body.isFavorite;
        let venue = req.body.venue;
        let datetime = req.body.datetime;
        let matchId = req.body.matchId;

        asyncLib.waterfall([
            function (done) {
                models.User.findOne({
                    where: { id: userId },
                })  
                    .then(function (userFound) {
                        done(null, userFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({'error': 'unable to verify user'});
                    })
            },
            function (userFound, done) {
                if(userFound){
                    models.MatchNotification.create({
                        venue: venue,
                        datetime: datetime,
                        isFavorite: isFavorite,
                        matchId: matchId,
                        UserId: userFound.id,
                    })
                        .then(function (newNotification) {
                            done(newNotification);
                        });
                } else {
                    return res.status(404).json({'error': 'user is not logged in'});
                }
            }
        ], function (newNotification) {
            if (newNotification){
                return res.status(201).json(newNotification);
            } else {
                return res.status(500).json({ 'error': 'cannot create notification' });
            }
        });

    },
    listNotification: function (req, res) {
        let fields = req.query.fields;
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        let order = req.query.order;

        models.MatchNotification.findAll({
            order: order,
            attributes: null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: ['username']
            }]
        })
            .then(function (notifications) {
                if (notifications) {
                    res.status(200).json(notifications);
                } else {
                    res.status(404).json({ 'error': 'no notifications found' });
                }
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).json({ 'error': 'invalid fields' });
            })
    },
    listUserNotifications: function (req, res) {
        let user = req.params.user;
        models.sequelize.query(`SELECT m.datetime, m.isFavorite, m.venue, m.matchId FROM matchnotifications m,users u WHERE u.username = '${user}' AND userId = u.id`, {
            model: models.MatchNotification,
        })
            .then(function (notifications) {
                if (notifications) {
                    res.status(200).json(notifications);
                } else {
                    res.status(404).json({ 'error': 'no notifications found' });
                }
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).json({ 'error': 'invalid fields' });
            })
    },
    deleteNotification: function (req, res) {
        return {
            delete: models.MatchNotification.destroy({where: {matchId: req.params.id}}),
            response: res.status(200).json({'success': 'deleted'})
        }
    }

};
