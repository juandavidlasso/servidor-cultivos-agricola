'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cortes', {
      id_corte: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fecha_siembra: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      fecha_inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      fecha_corte: {
        type: Sequelize.DATEONLY
      },
      activo: {
        type: Sequelize.BOOLEAN
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
<<<<<<< HEAD
      area: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
=======
>>>>>>> e647131971aeb667a205d688b46ac6103896c168
      suerte_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cortes');
  }
};
