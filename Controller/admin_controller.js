const express = require('express');
const AdminSchema = require('../Model/Admin');
const OrderSchema = require('../Model/Order')
const UserSchema = require('../Model/User')
const ShippingSchema = require('../Model/Shipping')


const PaymentSchema = require('../Model/Payment')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
//const Shipping = require('../Model/Shipping');
const JWT_SECRET = 'Hello World'


const GetAdmin = async (req, res) => {
    res.send('This is GetAdmin API')
}
const Register = async (req, res) => {
    try {
        const { username, phone, email, password } = req.body;
        let admin = await AdminSchema.findOne({ email: email })
        if (admin) {
            return res.json({ success: false, message: 'Email Already Exists' })
        }
        let salt = await bcrypt.genSalt(10)
        let secPass = await bcrypt.hash(password, salt)

        admin = new AdminSchema({ username: username, phone: phone, email: email, password: secPass })
        let savedAdmin = await admin.save()
        res.json({ success: true, savedAdmin })

    }
    catch (err) {
        console.log(err)
        res.json({ success: false, mess: 'Internal Server Error' })
    }
}
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let admin = await AdminSchema.findOne({ email })
        if (!admin) {
            return res.json({ success: false, message: 'Incorrect Email or Password' })
        }
        const ComparePassword = await bcrypt.compare(password, admin.password)
        if (!ComparePassword) {
            return res.json({ success: false, error: 'Incorrect Password' })
        }
        const data = {
            admin: {
                id: admin.id
            }
        }
        const authToken = await jwt.sign(data, JWT_SECRET)
        res.json({ success: true, authToken })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, mess: 'Internal Server Error' })
    }

}
const Insert = async (req, res) => {
    try {
        const { userusername, phone, email, password } = req.body;
        let admin = await AdminSchema.findOne({ email: email })
        if (admin) {
            res.json({ succuss: false, error: 'Email already Exists' });
        }
        admin = new AdminSchema({ userusername, phone, email, password });
        let savedadmin = await admin.save()
        res.json({ succuss: true, admin })
    }
    catch (err) {
        res.json({ succuss: false, Mess: "Internal Server Error" })
        console.log(err)
    }
}

const Payment = async (req, res) => {
    try {
        let Payment = await PaymentSchema.find()
        .populate('user_id')
        /* 
         let user_id=Payment.map((item)=>{
            return item.user_id
        })
        console.log(user_id)
        let user= user_id.map(async(item)=>{
            return (await UserSchema.findById(item))
        })
        //let pay =await PaymentSchema.findById(user_id)
       // console.log(pay) */
        res.json({ success: true, Payment})
    }
    catch (err) {
        res.json({ success: false, message: 'Internal Server Error' })
        console.log(err)
    }
}


const Order = async (req, res) => {
    try {

        let Order = await OrderSchema.find()
            .populate('user_id')
        /* let user;
         let Shipping;
           let user_id = []
          let shipping_id = []
   */
        /*   let user_id = Order.map((item) => {
              return item.user_id
              //user_id += item.user_id
              // user = await UserSchema.findById(user_id)
              // shipping_id += item.shipping_id
              // Shipping=await ShippingSchema.findById(shipping_id)
  
          })
          console.log(user_id)
          for (i in user_id) {
              user = await UserSchema.findById(user_id[i])
          }
          console.log(user)
  
  
          let grocery_id = Order.map((i, index) => {
              /* for(x in i.cart){
                  console.log(x)
                  return i.cart[x].grocery_id
              } */
        //console.log(i.cart[index].grocery_id)
        /* for(p in i.cart){
            return i.cart[index].grocery_id
        } */
        /*   let id = (i.cart).map((u, index) => {
              return u.grocery_id
          }) */

        //return i.cart[index].grocery_id

        /* let gro=id.map((t,index)=>{
            console.log(index)
            for(k in t){
                console.log(k)
            }
        }) 
        d = id[0][1]
        return d
    })
    console.log(grocery_id, 1111)
    /*  for(e in grocery_id){
         console.log(e)
     } */
        /*  console.log(shipping_id) 
        console.log(user) */
        res.json({ success: true, Order })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, mess: 'Internal Server Error' })
    }
}

const DeleteAdmin = async (req, res) => {
    try {
        let id = req.params.id;
        // res.send('This is DeleteAdmin API')
        let Dlt_Admin = await AdminSchema.findByIdAndDelete(id)
        res.json({ succuss: true, Dlt_Admin })
    }
    catch (err) {
        res.json({ succuss: false, Mess: "Internal Server Error" })
        console.log(err)
    }

}
const UpdateAdmin = async (req, res) => {
    try {
        let admin_id = req.param.id;
        const { username, phone, email, password } = req.body;
        let admin = await AdminSchema.findById(admin_id)
        if (!admin) {
            return res.json({ succuss: false, mess: 'admin Not Found' })
        }
        admin = await AdminSchema.findOne({ email })
        if (!admin) {
            return res.json({ succuss: false, Mess: 'admin Already Exists This Email' })
        }
        let newadmin = {}
        if (username) {
            { newadmin.username = username }
        }

        if (phone) {
            { newadmin.phone = phone }
        }
        if (password) {
            { newadmin.password = password }
        }
        if (email) {
            { newadmin.email = email }
            admin = await AdminSchema.findByIdAndUpdate(admin_id, { $set: newadmin }, { new: true })
            res.json({ succuss: true, admin })


        }

    }
    catch (err) {
        res.json({ succuss: false, Mess: 'Internal Server Error' })
    }
}
module.exports = { GetAdmin, Register, Payment, Login, Insert, Order, DeleteAdmin, UpdateAdmin }