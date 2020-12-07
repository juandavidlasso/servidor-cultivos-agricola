'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cosechas', {
      id_cosecha: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      peso: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      rendimiento: {
        type: Sequelize.FLOAT
      },
      corte_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cosechas');
  }
};
