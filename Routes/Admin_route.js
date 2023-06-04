const express = require('express')
const { GetAdmin, Register, Payment,Login,Order,Insert, UpdateAdmin, DeleteAdmin } = require('../Controller/admin_controller')
const route = express.Router()

route.get('/getadmin', GetAdmin)
route.get('/getOrder',Order)
route.get('/getPayment',Payment)

route.post('/register', Register)
route.post('/login', Login)
route.post('/insert', Insert)
route.put('/update/:id', UpdateAdmin)
route.delete('/delete/:id', DeleteAdmin)

module.exports = route
