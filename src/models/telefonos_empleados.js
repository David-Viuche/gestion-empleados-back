'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Telefonos_Empleados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Telefonos_Empleados.belongsTo(models.Empleados, { 
        foreignKey: 'empleado_id'
      });
    }
  };
  Telefonos_Empleados.init({
    empleado_id: DataTypes.INTEGER,
    telefono: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Telefonos_Empleados',
  });
  return Telefonos_Empleados;
};