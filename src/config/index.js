//*	Dependencias y módulos
require('dotenv').config()

//*	Configuración
const config = {
	dbHost:			process.env.DB_HOST,
	dbUser:			process.env.DB_USER,
	dbPass:			process.env.DB_PASSWORD,
	dbPort:			process.env.DB_PORT,
	db:				process.env.DB_DATABASE,
	dbDrive:		process.env.DB_DRIVE,

	appPort:		process.env.APP_POST,
	appSaltPass:	process.env.APP_SALT_PASSWORD,
	jwtSecret:		process.env.JWT_SECRET,
	jwtExpire:		process.env.JWT_EXPIRE,
}

//*	Exportamos configuración
module.exports = config
