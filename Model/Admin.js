const mongoose = require('mongoose')
const { Schema } = mongoose

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model('Admin', AdminSchema)