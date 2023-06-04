
const express = require('express')
const mongoose = require('mongoose')
const { Schema } = mongoose

const ShippingSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    grocery_id: {
        type: Array,
        required: true,
    },
    cart_id: {
        type: Array,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pin_code: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("shipping", ShippingSchema)