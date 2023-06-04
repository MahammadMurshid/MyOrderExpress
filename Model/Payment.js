
const express = require('express')
const mongoose = require('mongoose')
const {Schema} = mongoose

const PaymentSchema = new Schema ({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
    },
    total:{
        type:String,
        required:true,
    },
    payment_type:{
        type:String,
        required:true,
    }, 
    status:{
        type:String,
        required:true,
    }, 
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("payment", PaymentSchema)
