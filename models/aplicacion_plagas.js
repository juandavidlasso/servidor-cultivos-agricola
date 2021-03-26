'use strict';
module.exports = (sequelize, DataTypes) => {
  const Aplicacion_plagas = sequelize.define('Aplicacion_plagas', {
    id_apla: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    corte_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tablon_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trapl_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  Aplicacion_plagas.associate = function(models) {
    // aplicacion plagas pertenece a un corte
    Aplicacion_plagas.belongsTo(models.Cortes, { foreignKey: 'corte_id', onDelete: 'CASCADE' } )
    // aplicacion plagas pertenece a un tablon
    Aplicacion_plagas.belongsTo(models.Tablones, { foreignKey: 'tablon_id', onDelete: 'CASCADE' } )
    // aplicacion plagas pertenece a un tratamiento plagas
    Aplicacion_plagas.belongsTo(models.Tratamiento_plagas, { foreignKey: 'trapl_id', onDelete: 'CASCADE' } )
  };
  return Aplicacion_plagas;
};