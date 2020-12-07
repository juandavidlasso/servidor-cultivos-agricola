'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Aplicacion_fertilizantes', ['corte_id'], {
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Aplicacion_fertilizantes','fk_Idapfe_corteId')
  }
};
