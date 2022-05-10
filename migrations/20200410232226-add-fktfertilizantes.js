'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Tratamiento_fertilizantes', {
      fields: ['apfe_id'],
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

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Tratamiento_fertilizantes','fk_Idtrafe_apfeId')
  }
};
