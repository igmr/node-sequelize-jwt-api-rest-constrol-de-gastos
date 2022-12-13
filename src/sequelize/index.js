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
	foreignKey: 'servicio_id'
})

//*	Asociación Usuario 1:N Servicio
UserSequelize.hasMany( ServiceSequelize, {
	foreignKey: 'servicio_id'
})

//*	Asociación Servicio 1:1 Usuario
ServiceSequelize.belongsTo( UserSequelize, {
	foreignKey: 'servicio_id'
})

//*	Asociación Usuario 1:N Pago
UserSequelize.hasMany( PaymentSequelize, {
	foreignKey: 'servicio_id'
})

//*	Asociación Pago 1:1 Usuario
PaymentSequelize.belongsTo( UserSequelize, {
	foreignKey: 'servicio_id'
})
