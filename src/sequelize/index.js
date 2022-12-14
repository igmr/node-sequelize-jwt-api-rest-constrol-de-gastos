//*	Dependencias y módulos
const UserSequelize = require('./user.sequelize')
const ServiceSequelize = require('./service.sequelize')
const PaymentSequelize = require('./payment.sequelize')

//*	Asociación Servicio 1:N Pago
ServiceSequelize.hasMany( PaymentSequelize, {
	foreignKey: 'servicio_id'
})

//*	Asociación Pago 1:1 Servicio
PaymentSequelize.belongsTo( ServiceSequelize, {
	foreignKey: 'id'
})
