//* Dependencias y módulos
const {matchedData} = require('express-validator')
const {respond, respondCreated, respondFail, respondDeleted} = require('./../utils/handleHttpResponse')
const respondException = require('./../utils/handleException')
const serviceModel = require('./../models/service.model')

/**
 * * Ruta: Lista de servicios
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const index = async (req, res)=>{
	try {
		const data = await serviceModel.findAll()
		return respond(res,data)
	} catch (ex) {
		return respondException(res, ex)
	}
}

/**
 * * Ruta: Obtener servicio
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const find = async (req, res)=>{
	try {
		req= matchedData(req)
		let data = await serviceModel.find(Number(req.id))
		return respond(res,data)
	} catch (ex) {
		return respondException(res, ex)
	}
}

/**
 * * Ruta: Crear servicio
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const store = async (req, res)=>{
	try {
		const {userId} = req
		req = matchedData(req)
		const payload = {
			...req,
			basic_cost: Number(req.basic_cost),
			registered: userId,
		}
		const service = await serviceModel.create(payload)
		return respondCreated(res, service)
	} catch (ex) {
		return respondException(res,ex)
	}
}
/**
 * * Ruta: Actualizar servicio
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const update = async (req, res)=>{
	try {
		const body = matchedData(req, {locations:['body']})
		const {id} = matchedData(req, {locations: ['params']})
		if(Object.entries(body).length == 0)
			return respondFail(res, 'Datos no recuperados')
		const searchService = await serviceModel.find(Number(id))
		if(!searchService)
			return respondFail(res, 'Recurso no recuperados')
		const result = await serviceModel.update(body, id)
		if(result == 1)
		{
			const service = await serviceModel.find(id)
			return respond(res,service)
		}
	} catch (ex) {
		return respondException(res, ex)
	}
}

/**
 * * Ruta: Eliminar servicio
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const destroy = async (req, res)=>{
	try {
		const {id} = matchedData(req, {locations:['params']})
		const searchService =  await serviceModel.find(Number(id))
		if(!searchService)
			return respondFail(res, 'Recurso no recuperados')
		await serviceModel.destroy(Number(id))
		return respondDeleted(res, "servicio eliminado")
	} catch (ex) {
		return respondException(res, ex)
	}
}

/**
 * * Ruta: Restaurar servicio
 * @param {request} req 
 * @param {response} res 
 * @returns {response}
 */
const restore = async (req, res)=>{
	try {
		const {id} = matchedData(req, {locations:['params']})
		const searchService =  await serviceModel.findDeleted(Number(id))
		if(!searchService)
			return respondFail(res, 'Recurso no recuperados')
		await serviceModel.restore(Number(id))
		return respondDeleted(res, "servicio restaurado")
	} catch (ex) {
		return respondException(res, ex)
	}
}

//* Exportamos funciones
module.exports = {
	index, find, store,
	update,
	destroy, restore
}
