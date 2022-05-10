'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Maquinarias', {
      idMaquinaria: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      marca: {
        type: Sequelize.STRING,
        allowNull: false
      },
      serie: {
        type: Sequelize.STRING,
        allowNull: false
      },
      modelo: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      potencia: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Maquinarias');
  }
};