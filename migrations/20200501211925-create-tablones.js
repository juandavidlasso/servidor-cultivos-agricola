'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tablones', {
      id_tablon: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      area: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
<<<<<<< HEAD
      corte_id: {
=======
      suerte_id: {
>>>>>>> e647131971aeb667a205d688b46ac6103896c168
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tablones');
  }
};