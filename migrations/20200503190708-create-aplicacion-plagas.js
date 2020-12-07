'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Aplicacion_plagas', {
      id_apla: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      corte_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tablon_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      trapl_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Aplicacion_plagas');
  }
};