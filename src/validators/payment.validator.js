//* Dependencias y módulos
const {check} = require('express-validator')
const handleValidation = require('./../utils/handleValidator')

//* Check en obtener pago
const checkFind = [
	check('id')
		.notEmpty()
			.withMessage('Es requerido.')
		.isNumeric()
			.withMessage('Debe ser numérico')
		.custom(value =>{
			if(Number(value) <= 0)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape(),
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

//* Check al crear pago
const checkStore = [
	check('service')
		.isNumeric()
			.withMessage('Formato inválido')
		.custom(value =>{
			if(Number(value) <= 0)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape()
		.optional(),
	check('cost')
		.notEmpty()
			.withMessage('Es requerido.')
		.isNumeric()
			.withMessage('Formato inválido')
		.custom(value =>{
			if(Number(value) <= 0)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape(),
	check('description')
		.isLength({max:255})
			.withMessage('La longitud máxima de caracteres son 255')
		.trim()
		.escape()
		.optional(),
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

//* Check al actualizar pago
const checkUpdate = [
	check('id')
		.notEmpty()
			.withMessage('Es requerido.')
		.isNumeric()
			.withMessage('Debe ser numérico.')
		.custom(value =>{
			if(Number(value) <= 0)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape(),
	check('service')
		.isNumeric()
			.withMessage('Formato inválido')
		.custom(value =>{
			if(Number(value) <= 0)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape()
		.optional(),
	check('cost')
		.isNumeric()
			.withMessage('Formato inválido')
		.custom(value =>{
			if(Number(value) <= 0)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape()
		.optional(),
	check('description')
		.isLength({max:255})
			.withMessage('La longitud máxima de caracteres son 255')
		.trim()
		.escape()
		.optional(),
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

//* Check al eliminar pago
const checkDestroy = [
	check('id')
		.notEmpty()
			.withMessage('Es requerido.')
		.isNumeric()
			.withMessage('Debe ser numérico')
		.custom(value =>{
			if(Number(value) <= 0)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape(),
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

//* Check al restaurar pago
const checkRestore = [
	check('id')
		.notEmpty()
			.withMessage('Es requerido.')
		.isNumeric()
			.withMessage('Debe ser numérico')
		.custom(value =>{
			if(Number(value) <= 0)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape(),
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

//* Exportamos funciones
module.exports = {
	checkFind,
	checkStore, checkUpdate,
	checkDestroy, checkRestore
}
