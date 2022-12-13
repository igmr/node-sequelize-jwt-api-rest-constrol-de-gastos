//* Dependencias y módulos
const {check} = require('express-validator')
const handleValidation = require('./../utils/handleValidator')

//* Check de inicio de sesión
const checkLogin = [
	check('email')
		.notEmpty()
			.withMessage('Es requerido.')
		.isEmail()
			.withMessage('Formato inválido.')
		.isLength({min: 5, max:255})
			.withMessage('La longitud debe ser menor a 255 y mayor a 5 caracteres')
		.trim()
		.escape(),
	check('password')
		.notEmpty()
			.withMessage('Es requerido.')
		.isLength({min: 5, max:255})
			.withMessage('La longitud debe ser menor a 255 y mayor a 5 caracteres')
		.trim()
		.escape(),
	(req,res,next)=> {
		return handleValidation(req,res,next)
	}
]

//* Check de registro de usuario
const checkStore = [
	check('name')
		.notEmpty()
			.withMessage('Es requerido.')
		.isLength({min: 5, max:65})
			.withMessage('La longitud debe ser menor a 65 y mayor a 5 caracteres')
		.trim()
		.escape(),
	check('password')
		.notEmpty()
			.withMessage('Es requerido.')
		.isLength({min: 4, max:65})
			.withMessage('La longitud debe ser menor a 65 y mayor a 4 caracteres')
		.trim()
		.escape(),
	check('email')
		.notEmpty()
			.withMessage('Es requerido.')
		.isEmail()
			.withMessage('Formato inválido')
		.isLength({min: 4, max:65})
			.withMessage('La longitud debe ser menor a 65 y mayor a 4 caracteres')
		.trim()
		.escape()
		.normalizeEmail(),
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

//* Exportamos funciones
module.exports = {checkLogin, checkStore}