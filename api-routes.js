// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to subscription portal',
    });
});
// Import user controller
const userController = require('./userController');
const subscriptionController = require('./subscriptionController');
// user routes
router.route('/users')
    .get(userController.index)
    .post(userController.new);
router.route('/users/validateUser')
    .post(userController.validate);
router.route('/users/:user_id')
    .get(userController.view)
router.route('/users/updateUser')
    .post(userController.update);
router.route('/users/deleteUser')
    .post(userController.delete);

router.route('/subscription')
    .get(subscriptionController.index)
    .post(subscriptionController.new);
router.route('/subscription/:subscription_id')
    .get(subscriptionController.view)
router.route('/subscription/updateSubscription')
    .post(subscriptionController.update);
router.route('/subscription/deleteSubscription')
    .post(subscriptionController.delete);


// Export API routes
module.exports = router;