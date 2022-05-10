'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Aplicacion_fertilizantes', {
      fields: ['corte_id'],
      type: 'foreign key',
      name: 'fk_Idapfe_corteId',
      references: { //Required field
        table: 'Cortes',
        field: 'id_corte'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Aplicacion_fertilizantes','fk_Idapfe_corteId')
  }
};
