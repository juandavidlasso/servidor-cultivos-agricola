'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Cosechas', ['corte_id'], {
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Cosechas','fk_Idcosecha_corteId')
  }
};
