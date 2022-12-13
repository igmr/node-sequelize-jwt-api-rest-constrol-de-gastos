//*	Dependencias y módulos
const {DataTypes} = require('sequelize')
const {connect:psql} = require('./../database/postgresql')

//*	Definición de modelo
const Payment = psql.define('Pago', {
	id: {
		type: DataTypes.INTEGER,
		field: 'id',
		allowNull: false,
		unique: true,
		comment: 'Clave primaria',
		autoIncrement: true,
		primaryKey: true,
	},
	service_id:{
		type: DataTypes.INTEGER,
		field: 'servicio_id',
		allowNull: false,
		unique: true,
		comment: 'Identificador del servicio',
		defaultValue: null,
		validate: {
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
					throw new Error('Valor inválido.')
			},
		}
	},
	cost:{
		type: DataTypes.FLOAT,
		field: 'costo',
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
	date:{
		type: DataTypes.DATE,
		field:'fecha',
		allowNull: false,
		unique: false,
		comment: 'Fecha de pago',
		defaultValue: DataTypes.NOW,
		validate: {
			isDate:{
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
	modelName: 'Pago',
	tableName: 'Pago',
	timestamps: true,
	createdAt: 'creado',
	updatedAt: 'editado',
	deletedAt: 'eliminado',
	paranoid: true,
})

//*	Exportamos modelo
module.exports = Payment
