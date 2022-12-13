//* Dependencias y módulos
const serviceSequelize = require('./../sequelize/service.sequelize')

/**
 * * Crear registro.
 * ! INSERT INTO servicio(nombre,descripcion,icono,costo_base,registrado)
 * ! VALUES (?,?,?,?,?)
 * @param {object} data 
 */
const create = async (data)=>{
	return await serviceSequelize.create(data)
}

/**
 * * Encontrar todos los registros.
 * ! SELECT id, nombre AS name, descripcion AS description, icono AS icon, costo_base AS basic_cost
 * ! FROM servicio
 * ! WHERE eliminado !=null
 * @returns {any}
 */
const findAll =  async ()=>{
	return await serviceSequelize.findAll({
		attributes:['id', ['nombre', 'name'], ['descripcion', 'description'],['icono', 'icon'], ['costo_base', 'basic_cost']],
	});
}

/**
 * * Encontrar registro por id
 * ! SELECT id, nombre, descripcion, icono, costo_base
 * ! FROM servicio
 * ! WHERE id= ?
 * ! AND eliminado !=null
 * @param {int} servicio_id 
 * @returns {any}
 */
const find =  async (servicie_id)=>{
	return await serviceSequelize.findOne({
		attributes:['id', ['nombre', 'name'], ['descripcion', 'description'],['icono', 'icon'], ['costo_base', 'basic_cost']],
		where: {id : servicie_id}
	})
}

/**
 * * Actualizar registro
 * ! UPDATE servicio SET
 * !    campo = ?
 * ! WHERE id= ?
 * !    AND eliminado != null;
 * @param {object} data 
 * @param {int} service_id 
 * @returns {any}
 */
const update = async (data, service_id)=>{
	return await serviceSequelize.update(data ,
		{where: {id: service_id}})
}

/**
 * * Eliminar registro (lógico)
 * ! UPDATE servicio SET
 * !    eliminado = 'time_current'
 * ! WHERE id= ?;
 * @param {object} data 
 * @param {int} service_id 
 * @returns {any}
 */
const destroy = async (service_id)=>{
	return await serviceSequelize.destroy({where: {id: service_id}})
}

/**
 * * Restaurar registro
 * ! UPDATE servicio SET
 * !    eliminado = null
 * ! WHERE id= ?;
 * @param {object} data 
 * @param {int} service_id 
 * @returns {any}
 */
const restore = async (service_id)=>{
	return await serviceSequelize.restore({where: {id: service_id}})
}

/**
 * * Encontrar datos eliminados
 * ! SELECT id, nombre AS name, descripcion AS description, icono AS icon, costo_base AS basic_cost
 * ! FROM servicio
 * ! WHERE id =?
 * @returns {any}
 */
const findDeleted = async (service_id)=>{
	return await serviceSequelize.findOne({
		attributes:['id', ['nombre', 'name'], ['descripcion', 'description'],['icono', 'icon'], ['costo_base', 'basic_cost']],
		where: {id : service_id},
		paranoid:false
	})
}

//* Exportamos funciones
module.exports =  {
	create,
	findAll, find,
	update,
	destroy, restore,
	findDeleted
}
