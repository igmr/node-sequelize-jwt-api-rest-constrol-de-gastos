//* Dependencias y módulos
const paymentSequelize = require('./../sequelize/payment.sequelize')

/**
 * * Crear registro
 * ! INSERT INTO pago(servicio_id, costo, descripcion, fecha, registrado)
 * ! VALUES (?,?,?,?,?)
 * @param {any} data 
 */
const create = async (data)=>{
	return await paymentSequelize.create(data)
}

/**
 * * Encontrar todos los registros.
 * ! SELECT id, servicio_id AS service_id, costo AS cost, descripcion AS description
 * !     , fecha AS date, registrado AS registered
 * ! FROM pago
 * ! WHERE
 * !     registrado = ?
 * !     AND eliminado != null
 * @returns {any}
 */
const findAll =  async (userId)=>{
	return await paymentSequelize.findAll({
		attributes:['id', ['servicio_id', 'service_id'], ['costo', 'cost']
			, ['descripcion', 'description'], ['fecha', 'date'], ['registrado', 'registered']],
			where:{registered: userId}
	});
}

/**
 * * Encontrar registro por id y usuario id
 * ! SELECT id, servicio_id AS service_id, costo AS cost, descripcion AS description
 * !     , fecha AS date, registrado AS registered
 * ! FROM pago
 * ! WHERE id= ?
 * !     registrado !=?
 * !     AND eliminado !=null
 * @param {int} payment_id 
 * @returns {any}
 */
const find =  async (payment_id, userId)=>{
	return await paymentSequelize.findOne({
		attributes:['id', ['servicio_id', 'service_id'], ['costo', 'cost']
			, ['descripcion', 'description'], ['fecha', 'date'], ['registrado', 'registered']],
		where: {
			id : payment_id,
			registered: userId
		}
	})
}

/**
 * * Actualizar registro
 * ! UPDATE pago SET
 * !    campo = ?
 * ! WHERE id= ?
 * !    AND eliminado != null;
 * @param {object} data 
 * @param {int} payment_id 
 * @returns {any}
 */
const update = async (data, payment_id)=>{
	return await paymentSequelize.update(data ,
		{where: {id: payment_id}})
}
/**
 * * Eliminar registro (lógico)
 * ! UPDATE pago SET
 * !    eliminado = 'time_current'
 * ! WHERE id= ?;
 * @param {int} payment_id 
 * @returns {any}
 */
const destroy = async (payment_id)=>{
	return await paymentSequelize.destroy({where: {id: payment_id}})
}
/**
 * * Restauración de borrado lógico especifico en tabla de pago.
 * ! UPDATE pago SET
 * !    eliminado = null
 * ! WHERE id= ?;
 * @param {int} payment_id 
 * @returns {any}
 */
const restore = async (payment_id)=>{
	return await paymentSequelize.restore({where: {id: payment_id}})
}

/**
 * * Encontrar registro eliminado
 * ! SELECT id, servicio_id AS service_id, costo AS cost, descripcion AS description
 * !     , fecha AS date, registrado AS registered
 * ! FROM pago
 * ! WHERE id= ?
 * !     registrado !=?
 * @param {int} payment_id 
 * @returns {any}
 */
const findDeleted =  async (payment_id, userId)=>{
	return await paymentSequelize.findOne({
		attributes:['id', ['servicio_id', 'service_id'], ['costo', 'cost']
			, ['descripcion', 'description'], ['fecha', 'date'], ['registrado', 'registered']],
		where: {
			id : payment_id,
			registered: userId
		},
		paranoid:false
	})
}

//* Exportamos funciones.
module.exports =  {
	create,
	findAll, find,
	update,
	destroy, restore,
	findDeleted
}
