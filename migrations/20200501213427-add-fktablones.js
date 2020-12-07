'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
<<<<<<< HEAD
    return queryInterface.addConstraint('Tablones', ['corte_id'], {
      type: 'foreign key',
      name: 'fk_Idtablon_corteid',
      references: { //Required field
        table: 'Cortes',
        field: 'id_corte'
=======
    return queryInterface.addConstraint('Tablones', ['suerte_id'], {
      type: 'foreign key',
      name: 'fk_Idtablon_suerteid',
      references: { //Required field
        table: 'Suertes',
        field: 'id_suerte'
>>>>>>> e647131971aeb667a205d688b46ac6103896c168
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
<<<<<<< HEAD
    return queryInterface.removeConstraint('Tablones','fk_Idtablon_corteid')
=======
    return queryInterface.removeConstraint('Tablones','fk_Idtablon_suerteid')
>>>>>>> e647131971aeb667a205d688b46ac6103896c168
  }
};
