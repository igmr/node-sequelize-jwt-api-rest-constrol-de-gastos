//* Dependencia y módulos
const {Router} = require('express')
const authorization = require('./../middleware/authorization')
const {index, find, store, update, destroy, restore} = require('./../controllers/payment.controller')
const {checkFind ,checkStore ,checkUpdate, checkDestroy ,checkRestore} = require('./../validators/payment.validator')

const paymentPath = '/api/v1/payment'

/**
 * * Rutas
 * @param {Express} app 
 */
const paymentApi = ( app )=>{
	const serviceRouter = Router()
	serviceRouter.get('/', authorization, index)
	serviceRouter.get('/:id', authorization, checkFind, find)
	serviceRouter.post('/', authorization, checkStore, store)
	serviceRouter.put('/:id', authorization, checkUpdate, update)
	serviceRouter.delete('/:id', authorization, checkDestroy, destroy)
	serviceRouter.delete('/restore/:id', authorization, checkRestore, restore)
	app.use(paymentPath, serviceRouter)
}

//* Exportamos función
module.exports = paymentApi
