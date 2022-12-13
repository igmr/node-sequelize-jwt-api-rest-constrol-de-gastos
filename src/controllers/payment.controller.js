const {matchedData} = require('express-validator')
const {respond, respondCreated, respondFailServerError, respondFailValidationErrors, respondFail, respondDeleted} = require('./../utils/handleHttpResponse')
const paymentModel = require('./../models/payment.model')
const serviceModel = require('./../models/service.model')
const {sequelizeValidationError} = require('./../utils/handleErrorSequelize')

/**
 * * Ruta: Lista de pagos
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const index = async (req, res)=>{
	try {
		const {userId} = req
		const data = await paymentModel.findAll(userId)
		return respond(res, data)
	} catch (ex) {
		// console.error(ex)
		return respondFailServerError(res, 'Excepción no controlada')
	}
}

/**
 * * Ruta: Encontrar pago
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const find = async (req, res)=>{
	try {
		const {userId} = req
		const {id} = matchedData(req, {locations:['params']})
		const data =await paymentModel.find(id, userId)
		return respond(res, data)
	} catch (ex) {
		// console.error(ex)
		return respondFailServerError(res, 'Excepción no controlada')
	}
}

/**
 * * Ruta: Crea pago
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const store = async (req, res)=>{
	try {
		const {userId} = req
		req = matchedData(req)
		const {service} = req
		if(!service)
			req = {...req, service_id:1}
		else{
			const findService = await serviceModel.find(service)
			if(!findService)
				return respondFail(res, 'Datos no localizado. (1)')
			req = {...req, service_id:service}
		}
		req = {...req, registered:userId}
		const result = await paymentModel.create(req)
		if(result)
		{
			return respondCreated(res, result)
		}
		return respondFail(res, 'Datos no localizado. (2)')
	} catch (ex) {
		// console.error(ex)
		if(ex.name == 'SequelizeValidationError' ||
			ex.name == 'SequelizeUniqueConstraintError')
		{
			const errors = sequelizeValidationError(ex.errors, ex.name)
			return respondFailValidationErrors(res, errors)
		}
		return respondFailServerError(res, 'Excepción no controlada')
	}
}

/**
 * * Ruta: Actualizar pago
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const update = async (req, res)=>{
	try {
		const {userId} = req
		const {id} = matchedData(req, {locations:['params']})
		const {service,cost,description} = matchedData(req, {locations:['body']})
		req = {}
		if(service)
		{
			const findService = await serviceModel.find(service)
			if(!findService)
				return respondFail(res, 'Datos no localizado. (1)')
			req = {...req, service_id:service}
		}
		if(cost)
		{
			req = {...req, cost}
		}
		if(description)
		{
			req = {...req, description}
		}
		if(Object.entries(req).length == 0)
			return respondFail(res, 'Dato, no localizado. (2)')
		const findPayment = await paymentModel.find(id, userId)
		if(Object.entries(findPayment).length == 0)
			return respondFail(res, 'Dato, no localizado. (3)')
		//* Actualiza datos
		const result = await paymentModel.update(req, id)
		if(result)
		{
			const payment = await paymentModel.find(id, userId)
			return respond(res, payment)
		}
		return respondFail(res, 'Dato, no localizado. (4)')
	} catch (ex) {
		// console.error(ex)
		return respondFailServerError(res, 'Excepción no controlada')
	}
}

/**
 * * Ruta: Eliminar pago (lógico)
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const destroy = async (req, res)=>{
	try {
		const {userId} = req
		const {id} = matchedData(req, {locations:['params']})
		const searchPayment =  await paymentModel.find(Number(id), userId)
		if(!searchPayment)
			return respondFail(res, 'Recurso no recuperados')
		await paymentModel.destroy(Number(id))
		return respondDeleted(res, "Pago eliminado")
	} catch (ex) {
		// console.error(ex)
		return respondFailServerError(res, 'Excepción no controlada')
	}
}

/**
 * * Ruta: Restaurar pago
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const restore = async (req, res)=>{
	try {
		const {userId} = req
		const {id} = matchedData(req, {locations:['params']})
		const searchPayment =  await paymentModel.findDeleted(Number(id), userId)
		if(!searchPayment)
			return respondFail(res, 'Recurso no recuperados')
		await paymentModel.restore(Number(id))
		return respondDeleted(res, "Pago restaurado")
	} catch (ex) {
		// console.error(ex)
		return respondFailServerError(res, 'Excepción no controlada')
	}
}

//* Exportamos funciones
module.exports = {
	index, find,
	store, update,
	destroy, restore
}
