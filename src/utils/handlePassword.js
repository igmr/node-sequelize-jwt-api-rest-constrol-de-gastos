//* Dependencias y módulos
const bcryptjs = require('bcryptjs')

/**
 * * Encripta contraseña
 * @param {string} passwordPlain 
 * @returns {string}
 */
const encrypt = async (passwordPlain) => {
	return await bcryptjs.hash(passwordPlain,10)
}

/**
 * * Comparación de contraseña
 * @param {string} passwordPlain 
 * @param {string} hashPassword 
 * @returns {bool}
 */
const compare = async (passwordPlain, hashPassword) => {
	return await bcryptjs.compareSync(passwordPlain,hashPassword)
}

//* Exportamos funciones
module.exports = {encrypt, compare}
