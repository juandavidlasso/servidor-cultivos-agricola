'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Tratamiento_herbicidas', {
      fields: ['aphe_id'],
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

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Tratamiento_herbicidas','fk_Idtrahe_apheId')
  }
};
