
const express = require('express')
const mongoose = require('mongoose')
const {Schema} = mongoose

const CartSchema = new Schema ({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    grocery_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'grocery',
    },
    quantity:{
        type:Number,
        required:true,
    }, 
    price:{
        type:Number,
        required:true,
    }, 
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("carts", CartSchema)