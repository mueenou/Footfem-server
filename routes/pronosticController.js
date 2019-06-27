// Imports
let models = require('../models');
let asyncLib = require('async');
let jwtUtils = require('../utils/jwt.util');
let sequelize = require('sequelize');


module.exports = {
    createPronostic: function (req, res) {
        // Getting auth header
        let headerAuth = req.headers['authorization'];
        let userId = jwtUtils.getUserId(headerAuth);

        // Params
        let home_team = req.body.home_team;
        let away_team = req.body.away_team;
        let pronostic = req.body.pronostic;
        let result = req.body.result;
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
                    models.Pronostic.create({
                        home_team: home_team,
                        away_team: away_team,
                        pronostic: pronostic,
                        result: result,
                        matchId: matchId,
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
        let user = req.params.user;
        models.sequelize.query(`SELECT p.matchId, p.home_team, p.away_team, p.pronostic, p.result FROM pronostics p,users u WHERE u.username = '${user}' AND userId = u.id`, {
            model: models.Pronostic,
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
    },

    listAllPronostics: function (req, res) {
      models.sequelize.query('SELECT p.matchId, p.home_team, p.away_team, p.pronostic, p.result, u.username FROM pronostics p,users u WHERE u.username = u.username AND userId = u.id', {
        model: models.Pronostic,
      })
      .then(function(pronostics) {
        if(pronostics) {
          res.status(200).json(pronostics);
        } else {
          res.status(404).json({ 'error': 'no pronostics found' });
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).son({'error': 'invalid fields'});
      })
    },

    deletePronostic: function (req, res) {
        return {
            delete: models.Pronostic.destroy({where: {matchId: req.params.id}}),
            response: res.status(200).json({'success': 'deleted'})
        }
    }

};
