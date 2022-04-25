'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Cosechas',
        'numeroVagones',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.addColumn(
        'Cosechas',
        'numeroMulas',
        {
          type: Sequelize.INTEGER
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Cosechas', 'numeroVagones'),
      queryInterface.removeColumn('Cosechas', 'numeroMulas')
    ]);
  }
};
