'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Aplicacion_plagas', ['trapl_id'], {
      type: 'foreign key',
      name: 'fk_Idapla_traplid',
      references: { //Required field
        table: 'Tratamiento_plagas',
        field: 'id_trapl'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Aplicacion_plagas','fk_Idapla_traplid')
  }
};
