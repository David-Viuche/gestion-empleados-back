'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empleados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Empleados.hasMany(
        models.Telefonos_Empleados,
        {
          foreignKey: 'empleado_id',
          as: 'telefonos',
          onDelete: 'CASCADE'
        }
      );
    }
  };
  Empleados.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    tipoIdentificacion: DataTypes.ENUM('nit', 'cc'),
    numeroIdentificacion: DataTypes.INTEGER,
    correo: DataTypes.STRING,
    fechaIngreso: DataTypes.DATE,
    salario: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Empleados',
  });
  return Empleados;
};