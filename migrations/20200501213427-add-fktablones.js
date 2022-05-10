'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Tablones', {
      fields: ['corte_id'],
      type: 'foreign key',
      name: 'fk_Idtablon_corteid',
      references: { //Required field
        table: 'Cortes',
        field: 'id_corte'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Tablones','fk_Idtablon_corteid')
  }
};
