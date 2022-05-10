'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mantenimientos', {
      idMantenimiento: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      detalle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      horaCambio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cantidad: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      insumoId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      maquinariaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mantenimientos');
  }
};