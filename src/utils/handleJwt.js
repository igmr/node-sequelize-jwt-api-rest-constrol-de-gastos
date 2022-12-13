//* Dependencias y módulos
const jwt = require('jsonwebtoken')
const conf = require('./../config')

//* Obtener datos
const key = conf.jwtSecret
const expire = 8640000
const algorithm = 'HS256'

/**
 * * Crear token
 * @param {int} user_id
 * @returns {string} 
 */
const tokenSign = (user_id)=>{
	const time = new Date()
	const options={
		expiresIn:expire,
		algorithm:algorithm,
	}
	const payload ={
		id: user_id,
		time,
	}
	const token = jwt.sign(payload,key,options)
	return token
}

/**
 * * Verificar token
 * @param {string} token 
 * @returns {object}
 */
const verifyToken = (token)=>{
	try {
		return jwt.verify(token,key)
	} catch (err) {
		console.error('Verify token',err)
		return null
	}
}

/**
 * * Respuesta con cookie con token
 * @param {response} res 
 * @param {string} token 
 * @returns {response}
 */
const respondJwtSuccess = (res, token)=>{
	const payload = {token}
	return res
		.header('token',token)
		.cookie('token',token,{httpOnly:true})
		.status(200)
		.json(payload)
}

/**
 * * Respuesta al expirar token
 * @param {response} res 
 * @returns {response}
 */
const respondJwtExpiredSuccess = (res)=>{
	const now = new Date()
	const expiredDate = new Date(now-1)
	const payload ={ token:''}
	return res
			.header('token','')
			.cookie('token','',{httpOnly:true, expires:expiredDate})
			.status(200)
			.json(payload)
}

//* exportamos funciones
module.exports = {
	tokenSign, verifyToken,
	respondJwtSuccess, respondJwtExpiredSuccess
}
