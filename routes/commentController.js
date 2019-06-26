// Imports
let models = require('../models');
let asyncLib = require('async');
let jwtUtils = require('../utils/jwt.util');

const CONTENT_LIMIT = 1000;

module.exports = {
      createComment: function (req, res) {
              // Params
              let description = req.body.description;
              let matchId = req.body.matchId;
              let comment_author = req.body.comment_author;
              let date = req.body.date;

              asyncLib.waterfall([
                  function (done) {
                      models.Comment.create({
                          description: description,
                          matchId: matchId,
                          comment_author: comment_author,
                          date: date,
                      })
                          .then(function (newComment) {
                              done(newComment);
                          });
                  },
              ], function (newComment) {
                  if (newComment){
                      return res.status(201).json(newComment);
                  } else {
                      return res.status(500).json({ 'error': 'cannot create notification' });
                  }
              });
          },

    listMatchComments: function (req, res) {
        let matchId = req.params.matchId;
        models.sequelize.query(`SELECT * FROM comments WHERE matchId = ${matchId}`, {
            model: models.Comment,
        })
            .then(function (comments) {
                if (comments) {
                    res.status(200).json(comments);
                } else {
                    res.status(404).json({ 'error': 'no comments found' });
                }
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).json({ 'error': 'invalid fields' });
            })
    },

    listComments: function (req, res){
      models.sequelize.query("SELECT * FROM `comments`", {
          model: models.Comment,
      })
      .then(function (allComments) {
          if (allComments) {
              res.status(200).json(allComments);
          } else {
              res.status(404).json({ 'error': 'no comments found' });
          }
      })
      .catch(function (err) {
          console.log(err);
          res.status(500).json({ 'error': 'invalid fields' });
      })
    },

    deleteComment: function (req, res){
      console.log(req.params.id);
      return {
          delete: models.Comment.destroy({where: {id: req.params.id}}),
          response: res.status(200).json({'success': 'deleted'})
      }
    }


};
