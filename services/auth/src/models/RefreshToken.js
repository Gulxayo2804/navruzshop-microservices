const mongoose = require('mongoose');

const refreshTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.SchemaType.ObjectID,
        required: true
    }
})

module.exports = mongoose.Model('RefreshToken', refreshTokenSchema);