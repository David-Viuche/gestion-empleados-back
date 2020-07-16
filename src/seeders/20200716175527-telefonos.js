'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Telefonos_Empleados', [
      {
        empleado_id:1,
        telefono:12312323,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        empleado_id:1,
        telefono:317263172,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        empleado_id:1,
        telefono:123123888,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        empleado_id:2,
        telefono:342738428,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        empleado_id:2,
        telefono:23718623,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
