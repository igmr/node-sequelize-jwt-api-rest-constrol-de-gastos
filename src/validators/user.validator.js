//* Dependencias y módulos
const {check} = require('express-validator')
const handleValidation = require('./../utils/handleValidator')

//* Check al actualizar usuario
const checkUpdate = [
	check('name')
		.isLength({min: 5, max:65})
			.withMessage('La longitud debe ser menor a 65 y mayor a 5 caracteres')
		.trim()
		.escape()
		.optional(),
	check('password')
		.isLength({min: 4, max:65})
			.withMessage('La longitud debe ser menor a 65 y mayor a 4 caracteres')
		.escape()
		.trim()
		.optional(),
	check('email')
		.isLength({min: 4, max:65})
			.withMessage('La longitud debe ser menor a 65 y mayor a 4 caracteres')
		.trim()
		.escape()
		.normalizeEmail()
		.optional(),
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

//* Exportamos función
module.exports = {checkUpdate}