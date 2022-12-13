//*	Dependencias y módulos
const userSequelize = require('./../sequelize/user.sequelize')

/**
 * * Crear registro.
 * ! INSERT INTO Usuario(id, nombre, correo, creado)
 * ! VALUES (?,?,?,?)
 * @param {object} data 
 */
const create = async (data)=>{
	return await userSequelize.create(data)
}

/**
 * * Encontrar todos los registros.
 * ! SELECT id, nombre AS name, correo AS email
 * ! FROM usuario
 * ! WHERE eliminado !=null
 * @returns {any}
 */
const findAll =  async ()=>{
	return await userSequelize.findAll({
		attributes:['id', ['nombre', 'name'], ['correo', 'email'],],
	});
}

/**
 * * Encontrar registro por id
 * ! SELECT id, nombre AS name, correo AS email
 * ! FROM usuario
 * ! WHERE id= ?
 * !     AND eliminado !=null
 * @param {int} user_id 
 * @returns {any}
 */
const find =  async (user_id)=>{
	return await userSequelize.findOne({
		attributes:['id', ['nombre', 'name'], ['correo', 'email'],],
		where: {id : user_id}
	})
}

/**
 * * Actualizar registro
 * ! UPDATE Usuario SET
 * !    campo = ?
 * ! WHERE id= ?
 * !    AND eliminado != null;
 * @param {object} data 
 * @param {int} user_id 
 * @returns {any}
 */
const update = async (data, user_id)=>{
	return await userSequelize.update(data ,
		{where: {id: user_id}})
}

/**
 * * Eliminar registro (lógico)
 * ! UPDATE Usuario SET
 * !    eliminado = 'time_current'
 * ! WHERE id= ?;
 * @param {object} data 
 * @param {int} user_id 
 * @returns {any}
 */
const destroy = async (user_id)=>{
	return await userSequelize.destroy({where: {id: user_id}})
}

/**
 * * Restaurar registro
 * ! UPDATE Usuario SET
 * !    eliminado = null
 * ! WHERE id= ?;
 * @param {object} data 
 * @param {int} user_id 
 * @returns {any}
 */
const restore = async (user_id)=>{
	return await userSequelize.restore({where: {id: user_id}})
}
/**
 * * Encontrar usuario por correo electrónico
 * ! SELECT *
 * ! FROM Usuario
 * ! WHERE correo=?;
 * @param {string} email 
 * @returns {any}
 */
const findUsuarioByEmail = async (email)=>{
	return userSequelize.findOne({where:{email:email}})
}

//*	Exportamos funciones
module.exports =  {
	create,
	findAll, find,
	update,
	destroy, restore,
	findUsuarioByEmail
}
