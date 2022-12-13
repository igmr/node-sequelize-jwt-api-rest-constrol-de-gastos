//* Dependencias y módulos
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authApi = require('./routes/auth.route')
const serviceApi = require('./routes/service.route')
const userApi = require('./routes/user.route')
const paymentApi = require('./routes/payment.route')
//* Aplicación express.js
const app = express()

//* Agregamos algunas middleware de configuración
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())

//* Agregar rutas Api
authApi(app)
serviceApi(app)
userApi(app)
paymentApi(app)

//* Exportamos aplicación
module.exports = app
