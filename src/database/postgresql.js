//*	Dependencias y módulos
const Sequelize = require('sequelize')
const conf = require('./../config')

//*	Datos de conexión hacia base de datos
const host  = conf.dbHost
const db    = conf.db
const user  = conf.dbUser
const pass  = conf.dbPass
const drive = conf.dbDrive

/**
 * * Conexión
 */
const connect = new Sequelize(db,user,pass, {
	host,
	dialect:drive,
	logging:false,
})

/**
 * * Cerrar conexión
 */
const disconnect = async ()=>{
	await connect.close()
}

/**
 * * Prueba de conexión hacia la base de datos
 * @returns {int}
 */
const database = async ()=>{
	try{
		//* Prueba de conexión
		await connect.authenticate()
		console.info(`Connection has been established successfully`)
		//* Crea las tablas si no existe
		await connect.sync()
		//* Elimina y crea nuevamente las tablas
		//await connect.sync({force:true})
		return 1
	}
	catch(ex){
		console.error('Unable to connect to the database:', ex);
		return 0
	}
}

//*	Exportamos funciones
module.exports = {connect, disconnect, database}
