'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Aplicacion_herbicidas', ['corte_id'], {
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Aplicacion_herbicidas','fk_Idaphe_corteId')
  }
};
