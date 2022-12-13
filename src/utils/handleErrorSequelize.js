
/**
 * * lista de errores de validaciones
 * @param {any} errors 
 * @returns {object}
 */
const sequelizeValidationError = (errors, typeError)=>{
	if(typeError == 'SequelizeUniqueConstraintError')
		return { param:'general', msg:'Revisar, existen datos duplicados.'}
	if(typeError == 'SequelizeValidationError')
		return errors.map(error =>{
			return { param: error.path, msg:error.message }
		})
}

//* Exportamos función
module.exports = {sequelizeValidationError}
