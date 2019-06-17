// Imports
let models = require('../models');
let asyncLib = require('async');
let jwtUtils = require('../utils/jwt.util');


module.exports = {
    createPronostic: function (req, res) {
        // Getting auth header
        let headerAuth = req.headers['authorization'];
        let userId = jwtUtils.getUserId(headerAuth);

        // Params
        let home_team = req.body.home_team;
        let away_team = req.body.away_team;
        let pronostic = req.body.pronostic;

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
                    models.Pronostic.create({
                        home_team: home_team,
                        away_team: away_team,
                        pronostic: pronostic,
                        UserId: userFound.id,
                    })
                        .then(function (newPronostic) {
                            done(newPronostic);
                        });
                } else {
                    return res.status(404).json({'error': 'user not found'});
                }
            }
        ], function (newPronostic) {
            if (newPronostic){
                return res.status(201).json(newPronostic);
            } else {
                return res.status(500).json({ 'error': 'cannot create pronostic' });
            }
        });

    },
    listPronostic: function (req, res) {
        let fields = req.query.fields;
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        let order = req.query.order;

        models.Pronostic.findAll({
            order: order,
            attributes: null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: ['username']
            }]
        })
            .then(function (pronostics) {
                if (pronostics) {
                    res.status(200).json(pronostics);
                } else {
                    res.status(404).json({ 'error': 'no pronostics found' });
                }
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).json({ 'error': 'invalid fields' });
            })
    }

};
