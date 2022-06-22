'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Aplicacion_mantenimientos', {
      fields: ['maquinariaId'],
      type: 'foreign key',
      name: 'fk_MaquinaId_IdMaquina',
      references: {
        table: 'Maquinarias',
        field: 'idMaquinaria'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Aplicacion_mantenimientos','fk_MaquinaId_IdMaquina')
  }
};
