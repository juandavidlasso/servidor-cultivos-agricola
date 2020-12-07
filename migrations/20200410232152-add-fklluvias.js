'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Lluvias', ['pluviometro_id'], {
      type: 'foreign key',
      name: 'fk_Idlluvia_pluviometroId',
      references: { //Required field
        table: 'Pluviometros',
        field: 'id_pluviometro'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Lluvias','fk_Idlluvia_pluviometroId')
  }
};
