//* Dependencias uy módulos
const {Router} = require('express');
const authorization = require('./../middleware/authorization')
const {index, update} = require('./../controllers/user.controller')
const {checkUpdate} = require('./../validators/user.validator')

const userPath = '/api/v1/user'

/**
 * * Rutas
 * @param {Express} app 
 */
const userApi = (app)=>{
	const userRouter = Router()
	userRouter.get('/', authorization, index)
	userRouter.put('/', authorization, checkUpdate, update)
	app.use(userPath, userRouter)
}

//* Exportamos función
module.exports = userApi
