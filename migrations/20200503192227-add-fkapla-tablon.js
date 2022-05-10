'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Aplicacion_plagas', {
      fields: ['tablon_id'],
      type: 'foreign key',
      name: 'fk_Idapla_tablonid',
      references: { //Required field
        table: 'Tablones',
        field: 'id_tablon'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Aplicacion_plagas','fk_Idapla_tablonid')
  }
};
