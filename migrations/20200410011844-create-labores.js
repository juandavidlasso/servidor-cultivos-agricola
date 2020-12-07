'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Labores', {
      id_labor: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      actividad: {
        type: Sequelize.STRING,
        allowNull: false
      },
      equipo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      estado: {
        type: Sequelize.STRING
      },
      pases: {
        type: Sequelize.INTEGER
      },
      aplico: {
        type: Sequelize.STRING
      },
      costo: {
        type: Sequelize.FLOAT
      },
      nota: {
        type: Sequelize.STRING
      },
      corte_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Labores');
  }
};
