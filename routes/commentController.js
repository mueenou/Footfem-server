// Imports
let models = require('../models');
let asyncLib = require('async');
let jwtUtils = require('../utils/jwt.util');

const CONTENT_LIMIT = 1000;

module.exports = {
  createComment: function (req, res) {
      // Params
      let description = req.body.description;
      let matchId = req.body.description;
      let comment_author = req.body.comment_author;
      let date = req.body.date;

      models.Comment.create({
         description: description,
          matchId: matchId,
          comment_author: comment_author,
          date: date,
      })
          .catch(function (err) {
              return res.status(400).json({'error': 'cannot create comment' });
          })
  }

};
