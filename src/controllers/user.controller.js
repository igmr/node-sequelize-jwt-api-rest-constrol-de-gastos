//* Dependencias y módulos
const {matchedData} = require('express-validator')
const {respond, respondFail} = require('./../utils/handleHttpResponse')
const {encrypt} = require('./../utils/handlePassword')
const respondException = require('./../utils/handleException')
const userModel = require('./../models/user.model')
const conf = require('./../config')

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
		return respondException(ex)
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
		return respondException(ex)
	}
}

//* Exportamos funciones
module.exports = {index, update}
