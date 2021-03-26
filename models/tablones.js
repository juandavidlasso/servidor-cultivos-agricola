'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tablones = sequelize.define('Tablones', {
    id_tablon: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    corte_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  Tablones.associate = function(models) {
    // tablones pertenece a un corte
    Tablones.belongsTo(models.Cortes, { as: 'cortePapa', foreignKey: 'corte_id', onDelete: 'CASCADE' })
    // tablones tiene muchas aplicacion plaga
    Tablones.hasMany(models.Aplicacion_plagas, { foreignKey: 'tablon_id' } )
    // Tablones tiene muchas aplicaciones riegos
    Tablones.hasMany(models.Aplicacion_riegos, { foreignKey: 'tablon_id' })
  };
  return Tablones;
};