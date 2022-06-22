'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Mantenimientos',
      'ApMantId',
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Mantenimientos', 'ApMantId')
  }
};
