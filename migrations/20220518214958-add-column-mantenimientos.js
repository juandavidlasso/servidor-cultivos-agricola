'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Mantenimientos',
      'tipoCambio',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }
    ),
    await queryInterface.addColumn(
      'Mantenimientos',
      'proximoCambio',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Mantenimientos', 'tipoCambio')
    await queryInterface.removeColumn('Mantenimientos', 'proximoCambio')
  }
};
