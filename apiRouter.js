// Imports
let express = require('express');
let usersCtrl = require('./routes/usersController');
let commentController = require('./routes/commentController');

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

    return apiRouter;
})();
