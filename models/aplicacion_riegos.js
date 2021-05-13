'use strict';
module.exports = (sequelize, DataTypes) => {
  const Aplicacion_riegos = sequelize.define('Aplicacion_riegos', {
    id_apriego: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    riego_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tablon_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    num_tablon: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  Aplicacion_riegos.associate = function(models) {
    // aplicacion riegos pertenece a un riego
    Aplicacion_riegos.belongsTo(models.Riegos, { foreignKey: 'riego_id', onDelete: 'CASCADE' })
    // aplicacion riegos pertenece a un tablon
    Aplicacion_riegos.belongsTo(models.Tablones, { foreignKey: 'tablon_id', onDelete: 'CASCADE' })
  };
  return Aplicacion_riegos;
};