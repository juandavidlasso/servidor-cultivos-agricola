'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Aplicacion_riegos', {
      id_apriego: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      riego_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tablon_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      num_tablon: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Aplicacion_riegos');
  }
};