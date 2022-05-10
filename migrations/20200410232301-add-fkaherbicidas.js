'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Aplicacion_herbicidas', {
      fields: ['corte_id'],
      type: 'foreign key',
      name: 'fk_Idaphe_corteId',
      references: { //Required field
        table: 'Cortes',
        field: 'id_corte'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Aplicacion_herbicidas','fk_Idaphe_corteId')
  }
};
