//*	Dependencias y módulos
const {DataTypes} = require('sequelize')
const {connect:psql} = require('../database/postgresql')

//*	Definición de modelo
const User = psql.define('Usuario', {
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
		unique: false,
		comment: 'Nombre propio',
		validate: {
			min:{
				args: 2,
				msg: 'Número mínimo de caracteres son 2.',
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
	email: {
		type: DataTypes.STRING(255),
		field: 'correo',
		allowNull: false,
		unique: true,
		comment: 'Correo de usuario',
		validate: {
			isEmail: {
				msg: 'Correo inválido',
			},
			notNull: {
				msg: 'Es requerido (1)'
			},
			notEmpty: {
				msg: 'Es requerido (2)'
			},
		}
	},
	password: {
		type: DataTypes.STRING(512),
		field:'contrasena',
		allowNull: false,
		unique: false,
		comment: 'Contraseña de usuario',
		validate: {
			notNull: {
				msg: 'Es requerido (1)',
			},
			notEmpty: {
				msg: 'Es requerido (2)'
			},
			min: {
				args: 10,
				msg: 'Número mínimo de caracteres son 10.',
			}
		}
	},
},{
	modelName: 'Usuario',
	tableName: 'Usuario',
	timestamps: true,
	createdAt: 'creado',
	updatedAt: 'editado',
	deletedAt: 'eliminado',
	paranoid: true,
})

//*	Exportamos modelo
module.exports = User
