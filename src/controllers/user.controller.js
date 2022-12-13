//* Dependencias y módulos
const {matchedData} = require('express-validator')
const {respond, respondFailServerError, respondFailValidationErrors, respondFail} = require('./../utils/handleHttpResponse')
const userModel = require('./../models/user.model')
const {sequelizeValidationError} = require('./../utils/handleErrorSequelize')
const conf = require('./../config')
const {encrypt} = require('./../utils/handlePassword')

/**
 * * Ruta: Obtener información del usuario
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const index = async (req, res)=>{
	try {
		const data = await userModel.find(Number(req.userId))
		return respond(res,data)
	} catch (ex) {
		// console.error(ex)
		return respondFailServerError(res, 'Excepción no controlada')
	}
}
/**
 * * Ruta: Actualizar usuario
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const update = async (req, res)=>{
	try {
		const {userId} = req
		req = matchedData(req)
		if(Object.entries(req).length == 0)
			return respondFail(res, 'Datos no localizados. (1)')
		const valid = await userModel.find(userId)
		if(!valid)
			return respondFail(res, 'Datos no localizados. (2)')
		if(req.password)
		{
			const salt = conf.appSaltPass
			const passwordPlain = req.password + salt
			const passwordEncrypt = await encrypt(passwordPlain)
			req = {...req, password:passwordEncrypt}
		}
		const result = await userModel.update(req, userId)
		if(result)
		{
			const user = await userModel.find(userId)
			return respond(res,user)
		}
		return respondFail(res, 'Datos no localizados (3)')
	} catch (ex) {
		// console.error(ex)
		if(ex.name == 'SequelizeValidationError' ||
			ex.name == 'SequelizeUniqueConstraintError')
		{
			const errors = sequelizeValidationError(ex.errors, ex.name)
			return respondFailValidationErrors(res, errors)
		}
		return respondFailServerError(res, 'Excepción no controlada')
	}
}

//* Exportamos funciones
module.exports = {index, update}
