//* Dependencias y módulos
const {check} = require('express-validator')
const handleValidation = require('./../utils/handleValidator')

//* Check al obtener servicio
const checkFind = [
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
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

//* Check al registrar servicio
const checkStore = [
	check('name')
		.notEmpty()
			.withMessage('Es requerido.')
		.isLength({min: 3, max:120})
			.withMessage('La longitud debe ser menor a 255 y mayor a 3 caracteres')
		.trim()
		.escape(),
	check('description')
		.isLength({max:255})
			.withMessage('La longitud máxima de caracteres son 255')
		.trim()
		.escape()
		.optional(),
	check('icon')
		.isLength({max:32})
			.withMessage('La longitud máxima de caracteres son 32')
		.trim()
		.escape()
		.optional(),
	check('basic_cost')
		.notEmpty()
			.withMessage('Es requerido.')
		.isNumeric()
			.withMessage('Formato inválido')
		.custom(value =>{
				if(Number(value) < 0)
				{
					throw new Error('Valor inválido.')
				}
				return true
			})
		.trim()
		.escape(),
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

//* Check al actualizar servicio
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
	check('name')
		.isLength({min: 3, max:120})
			.withMessage('La longitud debe ser menor a 255 y mayor a 3 caracteres')
		.trim()
		.escape()
		.optional(),
	check('description')
		.isLength({max:255})
			.withMessage('La longitud máxima de caracteres son 255')
		.trim()
		.escape()
		.optional(),
	check('icon')
		.isLength({max:32})
			.withMessage('La longitud máxima de caracteres son 32')
		.trim()
		.escape()
		.optional(),
	check('basic_cost')
		.isNumeric()
			.withMessage('Formato inválido')
		.custom(value =>{
				if(Number(value) < 0)
				{
					throw new Error('Valor inválido.')
				}
				return true
			})
		.trim()
		.escape()
		.optional(),
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

//* Check al eliminar servicio
const checkDestroy = [
	check('id')
		.notEmpty()
			.withMessage('Es requerido.')
		.isNumeric()
			.withMessage('Debe ser numérico')
		.custom(value =>{
			if(Number(value) <= 1)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape(),
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

//* Check al restaurar servicio
const checkRestart = [
	check('id')
		.notEmpty()
			.withMessage('Es requerido.')
		.isNumeric()
			.withMessage('Debe ser numérico')
		.custom(value =>{
			if(Number(value) <= 1)
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
	checkDestroy, checkRestart
}
