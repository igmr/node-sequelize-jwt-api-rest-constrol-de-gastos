//* Dependencias y módulos
const app = require('./src/app')
const conf = require('./src/config')
const {database} = require('./src/database/postgresql')

const port = process.env.PORT || conf.appPort

const runServer = ()=>{
	const showRunServer = () => console.info(`Server listening in http://localhost:${port}`)
	app.listen(port, showRunServer)
}

const main = async()=>
{
	const dbTest = await database();
	//* Hubo un error al crear tablas
	if(!dbTest)
		console.error(`Server not available`)
	else
	{
		//! Construcción de tablas
		require('./src/sequelize')
		runServer()
	}
}

//* Ejecuta función principal
main()