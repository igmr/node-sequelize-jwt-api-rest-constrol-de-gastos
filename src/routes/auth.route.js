//* Dependencia y módulos
const {Router} = require('express')
const {register:store, login , logout} = require('./../controllers/auth.controller')
const {checkLogin, checkStore } = require('./../validators/auth.validator')

const authPath = '/api/v1/auth'
/**
 * * Rutas
 * @param {Express} app 
 */
const authApi = ( app )=>{
	const authRouter = Router()
	authRouter.post('/register', checkStore, store)
	authRouter.post('/login', checkLogin, login)
	authRouter.post('/logout', logout)
	app.use(authPath, authRouter)
}

//* Exportamos función
module.exports = authApi
