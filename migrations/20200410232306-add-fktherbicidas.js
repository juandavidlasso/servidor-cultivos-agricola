'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Tratamiento_herbicidas', ['aphe_id'], {
      type: 'foreign key',
      name: 'fk_Idtrahe_apheId',
      references: { //Required field
        table: 'Aplicacion_herbicidas',
        field: 'id_aphe'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Tratamiento_herbicidas','fk_Idtrahe_apheId')
  }
};
