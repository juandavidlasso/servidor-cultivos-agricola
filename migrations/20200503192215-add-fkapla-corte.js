'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Aplicacion_plagas', {
      fields: ['corte_id'],
      type: 'foreign key',
      name: 'fk_Idapla_corteid',
      references: { //Required field
        table: 'Cortes',
        field: 'id_corte'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Aplicacion_plagas','fk_Idapla_corteid')
  }
};
