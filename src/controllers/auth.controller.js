//* Dependencias y módulos
const {matchedData} = require('express-validator')
const {respondUnauthorized, respondCreated, respondFail, respondFailServerError} = require('./../utils/handleHttpResponse')
const {tokenSign, respondJwtSuccess, respondJwtExpiredSuccess} = require('./../utils/handleJwt')
const {encrypt, compare} = require('./../utils/handlePassword')
const userModel = require('./../models/user.model')
const conf = require('./../config')

/**
 * * Ruta: Inicio de sesión
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const login = async (req,res) =>{
	try {
		req = matchedData(req)
		const { email, password } = req
		const user = await userModel.findUsuarioByEmail(email)
		if (user !== null){
			const salt = conf.appSaltPass
			const passwordPlain = `${req.password}.${salt}` 
			const dbPassword = user.password
			const validPassword = await compare(passwordPlain, dbPassword)
			if(validPassword){
				const token = await tokenSign(user.id)
				return respondJwtSuccess(res, token)
			}
			return respondUnauthorized(res, 'No autorizado (5)')
		}
		return respondUnauthorized(res, 'No autorizado (6)')
	} catch (ex) {
		// console.error(ex)
		return respondFailServerError(res, 'Excepción no controlado.')
	}
}
/**
 * * ruta: Registro de usuario
 * @param {request} req 
 * @param {response} res 
 * @returns response}
 */
const register = async (req, res)=>{
	try {
		req = matchedData(req)
		const salt = conf.appSaltPass
		const passwordPlain = `${req.password}.${salt}` 
		const passwordEncrypt = await encrypt(passwordPlain)
		const payload = {...req, password: passwordEncrypt}
		const user = await userModel.create(payload)
		if(user)
		{
			const data = await userModel.find(user.id)
			return respondCreated(res, data)
		}
		return respondFail(res, "Registro inválido")
	} catch (ex) {
		// console.error(ex)
		if(ex.name == 'SequelizeUniqueConstraintError')
		{
			 return respondFailServerError(res, 'Datos inválidos, revisar correo y contraseña')
		}
		return respondFailServerError(res, 'Excepción no controlado.')
	}
}

/**
 * * Ruta: Cierre de sesión
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const logout = async (req, res) =>{
	return respondJwtExpiredSuccess(res)
}

//* Exportamos funciones
module.exports = {register,login, logout}
