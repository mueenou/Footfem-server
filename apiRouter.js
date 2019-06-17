// Imports
let express = require('express');
let usersCtrl = require('./routes/usersController');
let commentController = require('./routes/commentController');
let pronosticController = require('./routes/pronosticController');

// Router
exports.router = (function () {
    let apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/me/').put(usersCtrl.updateUserProfile);

    // Comment routes
    apiRouter.route('/comments/new/').post(commentController.createComment);
    // apiRouter.route('/comments/').get(commentController.listComments);

    // Pronostic routes
    apiRouter.route('/pronostics/new').post(pronosticController.createPronostic);
    apiRouter.route('/pronostics/').get(pronosticController.listPronostic);

    return apiRouter;
})();
