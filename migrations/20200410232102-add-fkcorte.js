'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Cortes', {
      fields: ['suerte_id'],
      type: 'foreign key',
      name: 'fk_Idcorte_suerteid',
      references: {
        table: 'Suertes',
        field: 'id_suerte'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Cortes','fk_Idcorte_suerteid')
  }
};
