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

      if(description === null || comment_author === null) {
          return res.status(400).json({ 'error': 'invalid parameters' });
      }

      if(description > CONTENT_LIMIT) {
          return res.status(400).json({ 'error': 'number of characters exceeded (1000)' });
      }

      let newComment = models.Comment.create({
          matchId: matchId,
          description: description,
          comment_author: comment_author,
      })
          .then(function (newComment) {
              return res.status(200).json({'description': newComment.description});
          })
          .catch(function (err) {
              return res.status(500).json({ 'error': 'unable to read comment' });
          })
  }

};
