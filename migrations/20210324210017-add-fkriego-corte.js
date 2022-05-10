'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Riegos', {
      fields: ['corte_id'],
      type: 'foreign key',
      name: 'fk_Idriego_corteid',
      references: { //Required field
        table: 'Cortes',
        field: 'id_corte'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Riegos','fk_Idriego_corteid')
  }
};
