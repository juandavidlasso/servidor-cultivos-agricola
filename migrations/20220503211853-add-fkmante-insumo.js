'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Mantenimientos', {
      fields: ['insumoId'],
      type: 'foreign key',
      name: 'fk_IdInsumo_insumoId',
      references: {
        table: 'Insumos',
        field: 'idInsumo'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Mantenimientos','fk_IdInsumo_insumoId')
  }
};
