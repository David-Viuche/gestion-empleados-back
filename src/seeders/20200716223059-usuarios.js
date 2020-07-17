'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Juan',
        apellido: 'Rojas',
        correo: 'david@correo.com',
        contraseña: '$2b$10$Qg0TsBR8lfQ7YcVVzoCNNumHxs7mkkJ9xQrVJu7jsTMkl600aFysW',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};
