'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tratamiento_herbicidas', {
      id_trahe: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      producto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dosis: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      presentacion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      valor: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      aplico: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nota: {
        type: Sequelize.STRING
      },
      aphe_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tratamiento_herbicidas');
  }
};
