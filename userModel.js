// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    salary: {
        type: Number
    },
    role: {
        type: String,
        required: true
    },
    totalExperience: Number,
    joinDate: Date,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export User model
var User = module.exports = mongoose.model('user', userSchema, 'users');
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}