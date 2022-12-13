//* Dependencias y módulos
const {respondUnauthorized} = require('./../utils/handleHttpResponse')
const {verifyToken} = require('./../utils/handleJwt')

/**
 * *Middleware de autorización
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns {response|next}
 */
const authorization = async (req,res,next)=>{
	try {
		//* Obtener token
		const token = req.cookies.token
		if(token){
			//* Obtener datos de token
			const dataToken = await verifyToken(token)
			if(!dataToken)
				return respondUnauthorized(res,'No autorizado (1)')
			if(!dataToken.id)
				return respondUnauthorized(res,'No autorizado (2)')
			//* Agregar datos
			req.userId = dataToken.id
			return next()
		}
		return respondUnauthorized(res,'No autorizado (3)')
	} catch (err) {
		console.error(err)
		return respondUnauthorized(res,'No autorizado (4)')
	}
}

//* Exportamos función
module.exports = authorization
