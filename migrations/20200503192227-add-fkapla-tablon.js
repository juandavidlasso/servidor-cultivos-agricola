'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Aplicacion_plagas', ['tablon_id'], {
      type: 'foreign key',
      name: 'fk_Idapla_tablonid',
      references: { //Required field
        table: 'Tablones',
        field: 'id_tablon'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Aplicacion_plagas','fk_Idapla_tablonid')
  }
};
