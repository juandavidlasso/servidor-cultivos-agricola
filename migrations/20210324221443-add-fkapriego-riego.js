'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Aplicacion_riegos', ['riego_id'], {
      type: 'foreign key',
      name: 'fk_Idapriego_riegoid',
      references: { //Required field
        table: 'Riegos',
        field: 'id_riego'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Aplicacion_riegos','fk_Idapriego_riegoid')
  }
};
