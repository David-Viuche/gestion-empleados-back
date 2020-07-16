'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Empleados', [
      {
        nombre: 'Juan',
        apellido: 'Rojas',
        tipoIdentificacion: 'cc',
        numeroIdentificacion: 1024263283,
        correo: 'juan@coreo.com',
        fechaIngreso: new Date(),
        salario: 13231232.33,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Pedro',
        apellido: 'Ramirez',
        tipoIdentificacion: 'cc',
        numeroIdentificacion: 673578726,
        correo: 'pedro@coreo.com',
        fechaIngreso: new Date(),
        salario: 13231232.33,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Empleados', null, {});
  }
};
