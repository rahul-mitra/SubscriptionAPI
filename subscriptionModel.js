// subscriptionModel.js
var mongoose = require('mongoose');
// Setup schema
var subscriptionSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    subscriptionStartDate: {
        type: Date,
        required: true
    },
    subscriptionEndDate:{
        type:Date,
        required:true
    },
    subscriptionAmount:{type:Number,required:true},
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Subscription model
var Subscription = module.exports = mongoose.model('subscription', subscriptionSchema, 'subscriptions');
module.exports.get = function (callback, limit) {
    Subscription.find(callback).limit(limit);
}