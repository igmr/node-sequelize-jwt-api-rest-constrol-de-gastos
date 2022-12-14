//* Dependencias y módulos
const {sequelizeValidationError} = require('./../utils/handleErrorSequelize')
const {respondFailServerError, respondFailValidationErrors} = require('./handleHttpResponse')


const respondException = (res, ex)=>{
	console.error(ex)
	if(ex.name == 'SequelizeValidationError' ||
		ex.name == 'SequelizeUniqueConstraintError')
	{
		const errors = sequelizeValidationError(ex.errors, ex.name)
		return respondFailValidationErrors(res, errors)
	}
	return respondFailServerError(res, 'Excepción no controlada')
}

module.exports = respondException
