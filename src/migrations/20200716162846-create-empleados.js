'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Empleados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      tipoIdentificacion: {
        type: Sequelize.ENUM,
        values: ['nit', 'cc']
      },
      numeroIdentificacion: {
        type: Sequelize.INTEGER
      },
      correo: {
        type: Sequelize.STRING
      },
      fechaIngreso: {
        type: Sequelize.DATE
      },
      salario: {
        type: Sequelize.DECIMAL(10, 2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Empleados');
  }
};