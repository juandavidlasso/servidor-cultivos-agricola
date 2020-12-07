'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Aplicacion_plagas', ['corte_id'], {
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Aplicacion_plagas','fk_Idapla_corteid')
  }
};
