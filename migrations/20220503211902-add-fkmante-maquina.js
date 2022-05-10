'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Mantenimientos', {
      fields: ['maquinariaId'],
      type: 'foreign key',
      name: 'fk_IdMaquinaria_maquinariaId',
      references: {
        table: 'Maquinarias',
        field: 'idMaquinaria'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Mantenimientos','fk_IdMaquinaria_maquinariaId')
  }
};
