'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Lluvias', {
      fields: ['pluviometro_id'],
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

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Lluvias','fk_Idlluvia_pluviometroId')
  }
};
