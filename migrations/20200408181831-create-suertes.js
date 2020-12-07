'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Suertes', {
      id_suerte: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      area: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      variedad: {
        allowNull: false,
        type: Sequelize.STRING
      },
      zona: {
        allowNull: false,
        type: Sequelize.STRING
      },
      renovada: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Suertes');
  }
};
