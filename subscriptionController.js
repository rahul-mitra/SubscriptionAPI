// subscriptionController.js
// Import subscription model
SubscriptionModel = require('./subscriptionModel');
// Handle index actions
exports.index = function (req, res) {
    SubscriptionModel.get(function (err, subs) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Subscriptions retrieved successfully",
            data: subs
        });
    });
};
// Handle create subcription actions
exports.new = async (req, res) =>{
    var foundSub = await SubscriptionModel.findOne({ userID: req.body.userID });
    if (!foundSub) {
        var sub = new SubscriptionModel();
        console.log(req.body);
        sub.userID = req.body.userID;
        sub.subscriptionStartDate = req.body.subscriptionStartDate;
        sub.subscriptionEndDate = req.body.subscriptionEndDate;
        sub.subscriptionAmount = req.body.subscriptionAmount;
        // save the user and check for errors
        sub.save(function (err) {
            // Check for validation error
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'New user susbscription created!',
                    data: sub
                });
        });
    }
    else {
        foundSub.subscriptionStartDate = req.body.subscriptionStartDate;
        foundSub.subscriptionEndDate = req.body.subscriptionEndDate;
        foundSub.subscriptionAmount = req.body.subscriptionAmount;
        foundSub.save(function (error) {
            if (error)
                res.json(error);
            else
                res.json({
                    message: 'New user susbscription created!',
                    data: sub
                });
        })
    }

};
// Handle view subscription info
exports.view = function (req, res) {
    console.log(req.params.subscription_id)
    SubscriptionModel.findOne({ userID: req.params.subscription_id }, function (err, sub) {
        if (err)
            res.send(err);
        res.json({
            message: 'Subscription details loading..',
            data: sub
        });
    });
};


// Handle update Subscription info
exports.update = function (req, res) {
    SubscriptionModel.findById(req.body.subscription_id, function (err, sub) {
        if (err)
            res.send(err);
        sub.subscriptionStartDate = req.body.sub.subscriptionStartDate;
        sub.subscriptionEndDate = req.body.sub.subscriptionEndDate;
        sub.subscriptionAmount = req.body.sub.subscriptionAmount;
        // save the Subscription and check for errors
        sub.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Subscription Info updated',
                data: sub
            });
        });
    });
};
// Handle delete subscription
exports.delete = function (req, res) {
    console.log("Subscription id to be removed,", res.body);
    SubscriptionModel.deleteOne({
        _id: req.body.subscription_id
    }, function (err, sub) {
        console.log("sub removal response ", sub);
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Subscription deleted'
        });
    });
};