// Imports
let express = require('express');
let usersCtrl = require('./routes/usersController');
let commentController = require('./routes/commentController');
let pronosticController = require('./routes/pronosticController');
let matchNotificationController = require('./routes/matchNotificationController');

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
    apiRouter.route('/comments/match/:matchId').get(commentController.listMatchComments);
    // apiRouter.route('/comments/').get(commentController.listComments);

    // Pronostic routes
    apiRouter.route('/pronostics/new').post(pronosticController.createPronostic);
    // apiRouter.route('/pronostics/new').post(pronosticController.createPronostic);
    apiRouter.route('/pronostics/').get(pronosticController.listPronostic);
    apiRouter.route('/pronostics/:user').get(pronosticController.listPronostic);
    apiRouter.route('/pronostics/delete/:id').post(pronosticController.deletePronostic);

    // Notification routes
    apiRouter.route('/notifications/new').post(matchNotificationController.createNotification);
    apiRouter.route('/notifications/').get(matchNotificationController.listNotification);
    apiRouter.route('/notifications/:user').get(matchNotificationController.listUserNotifications);
    apiRouter.route('/notifications/delete/:id').post(matchNotificationController.deleteNotification);


    return apiRouter;
})();
