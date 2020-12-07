'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Cortes', ['suerte_id'], {
      type: 'foreign key',
      name: 'fk_Idcorte_suerteid',
      references: { //Required field
        table: 'Suertes',
        field: 'id_suerte'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Cortes','fk_Idcorte_suerteid')
  }
};
