'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Cosechas', {
      fields: ['corte_id'],
      type: 'foreign key',
      name: 'fk_Idcosecha_corteId',
      references: { //Required field
        table: 'Cortes',
        field: 'id_corte'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Cosechas','fk_Idcosecha_corteId')
  }
};
