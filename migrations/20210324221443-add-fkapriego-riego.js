'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Aplicacion_riegos', {
      fields: ['riego_id'],
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

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Aplicacion_riegos','fk_Idapriego_riegoid')
  }
};
