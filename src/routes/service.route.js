//* Dependencia y módulos
const {Router} = require('express')
const authorization = require('./../middleware/authorization')
const {index, find, store, update, destroy, restore} = require('./../controllers/service.controller')
const {checkFind ,checkStore ,checkUpdate, checkDestroy ,checkRestart} = require('./../validators/service.validator')

const servicePath = '/api/v1/service'

/**
 * * Rutas
 * @param {Express} app 
 */
const serviceApi = ( app )=>{
	const serviceRouter = Router()
	serviceRouter.get('/', authorization, index)
	serviceRouter.get('/:id', authorization, checkFind, find)
	serviceRouter.post('/', authorization, checkStore, store)
	serviceRouter.put('/:id', authorization, checkUpdate, update)
	serviceRouter.delete('/:id', authorization, checkDestroy, destroy)
	serviceRouter.delete('/restore/:id', authorization, checkRestart, restore)
	app.use(servicePath, serviceRouter)
}

//* Exportamos función
module.exports = serviceApi
