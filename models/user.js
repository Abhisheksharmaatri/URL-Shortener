const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    urls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Url'
    }],
    verificationStatus: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);