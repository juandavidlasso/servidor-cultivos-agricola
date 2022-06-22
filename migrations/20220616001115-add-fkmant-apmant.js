'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Mantenimientos', {
      fields: ['ApMantId'],
      type: 'foreign key',
      name: 'fk_ManteId_IdMante',
      references: {
        table: 'Aplicacion_mantenimientos',
        field: 'idApMant'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Mantenimientos','fk_ManteId_IdMante')
  }
};
