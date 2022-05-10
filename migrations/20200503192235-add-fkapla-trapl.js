'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Aplicacion_plagas', {
      fields: ['trapl_id'],
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

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Aplicacion_plagas','fk_Idapla_traplid')
  }
};
