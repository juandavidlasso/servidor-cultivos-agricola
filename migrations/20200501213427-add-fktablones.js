'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Tablones', ['corte_id'], {
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Tablones','fk_Idtablon_corteid')
  }
};
