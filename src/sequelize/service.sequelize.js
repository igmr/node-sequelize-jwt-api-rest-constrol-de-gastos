//*	Dependencias y módulos
const {DataTypes} = require('sequelize')
const {connect:psql} = require('../database/postgresql')

//*	Definición de modelo
const Service = psql.define('Servicio', {
	id: {
		type: DataTypes.INTEGER,
		field: 'id',
		allowNull: false,
		unique: true,
		comment: 'Clave primaria',
		autoIncrement: true,
		primaryKey: true,
	},
	name:{
		type: DataTypes.STRING(120),
		field: 'nombre',
		allowNull: false,
		unique: true,
		comment: 'Nombre del servicio',
		defaultValue: null,
		validate: {
			min:{
				args: 3,
				msg: 'Número mínimo de caracteres son 3.',
			},
			max:{
				args: 120,
				msg: 'Número máximo de caracteres son 120.'
			},
			notNull:{
				args: true,
				msg: 'Es requerido (1)',
			},
			notEmpty:{
				args: true,
				msg: 'Es requerido (2)'
			}
		}
	},
	description:{
		type: DataTypes.STRING(255),
		field: 'descripcion',
		allowNull: true,
		unique: false,
		comment: 'Descripción del servicio (opcional)',
		defaultValue: null,
		validate: {
			max:{
				args: 255,
				msg: 'Número máximo de caracteres son 255.'
			},
		}
	},
	icon:{
		type: DataTypes.STRING(32),
		field: 'icono',
		allowNull: true,
		unique: false,
		comment: 'Icono del servicio (opcional)',
		defaultValue: null,
		validate: {
			max:{
				args: 32,
				msg: 'Número máximo de caracteres son 32.'
			},
		}
	},
	basic_cost:{
		type: DataTypes.FLOAT,
		field: 'costo_base',
		allowNull: false,
		unique: false,
		comment: 'Costo base de servicio',
		defaultValue: 0,
		validate: {
			isFloat:{
				args: true,
				msg: 'Formato invalido',
			},
			notNull:{
				args: true,
				msg: 'Es requerido (1)',
			},
			notEmpty:{
				args: true,
				msg: 'Es requerido (2)'
			},
			isGreaterThanZero(value){
				if(Number(value) <= 0)
					throw new Error('Debe ser mayor a 0')
			}
		}
	},
	registered: {
		type: DataTypes.INTEGER,
		field: 'registrado',
		allowNull: false,
		unique: false,
		comment: 'Identificador del usuario',
		defaultValue:0,
		validate: {
			isNumeric:{
				args: true,
				msg: 'Formato invalido',
			},
			notNull:{
				args: true,
				msg: 'Es requerido (1)',
			},
			notEmpty:{
				args: true,
				msg: 'Es requerido (2)'
			},
			isGreaterThanZero(value){
				if(Number(value) <= 0)
					throw new Error('Debe ser mayor a 0')
			}
		}
	},
},{
	modelName: 'Servicio',
	tableName: 'Servicio',
	timestamps: true,
	createdAt: 'creado',
	updatedAt: 'editado',
	deletedAt: 'eliminado',
	paranoid: true,
})

//*	Exportamos modelo
module.exports = Service
