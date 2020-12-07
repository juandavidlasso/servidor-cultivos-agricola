'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Tratamiento_fertilizantes', ['apfe_id'], {
      type: 'foreign key',
      name: 'fk_Idtrafe_apfeId',
      references: { //Required field
        table: 'Aplicacion_fertilizantes',
        field: 'id_apfe'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Tratamiento_fertilizantes','fk_Idtrafe_apfeId')
  }
};
