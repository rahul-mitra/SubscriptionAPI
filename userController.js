// userController.js
// Import user model
User = require('./userModel');
// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};
// Handle create user actions
exports.new = function (req, res) {
    var user = new User();
    user.name = req.body.name ? req.body.name : user.name;
    user.salary = req.body.salary;
    user.role = req.body.role;
    user.password = req.body.password;
    user.totalExperience = req.body.totalExperience;
    user.joinDate = Date.now();
    // save the user and check for errors
    user.save(function (err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New user created!',
                data: user
            });
    });
};
// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};

exports.validate = async (req, res) => {
    console.log(req.body);
    var foundUser = await User.findOne({ name: req.body.name, password: req.body.password, role: "admin" });
    if (foundUser) {
        res.json({
            message: 'User found',
            data: foundUser,
            allowLogin: true
        });
    }
    else {
        res.json({
            message: 'User not found or not admin',
            allowLogin: false
        });
    }
}

// Handle update user info
exports.update = function (req, res) {
    User.findById(req.body.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.name = req.body.user.name ? req.body.user.name : user.name;
        user.salary = req.body.user.salary;
        user.role = req.body.user.role;
        user.totalExperience = req.body.user.totalExperience;
        // save the user and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
};
// Handle delete user
exports.delete = function (req, res) {
    User.remove({
        _id: req.body.user_id
    }, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};