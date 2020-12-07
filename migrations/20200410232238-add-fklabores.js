'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Labores', ['corte_id'], {
      type: 'foreign key',
      name: 'fk_Idlabor_corteId',
      references: { //Required field
        table: 'Cortes',
        field: 'id_corte'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Labores','fk_Idlabor_corteId')
  }
};
