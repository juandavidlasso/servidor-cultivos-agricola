'use strict';
module.exports = (sequelize, DataTypes) => {
  const Riegos = sequelize.define('Riegos', {
    id_riego: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    num_riego: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    corte_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  Riegos.associate = function(models) {
    // riegos pertenece a un corte
    Riegos.belongsTo(models.Cortes, { foreignKey: 'corte_id', onDelete: 'CASCADE' })
    // riegos tiene muchas aplicaciones riegos
    Riegos.hasMany(models.Aplicacion_riegos, { foreignKey: 'riego_id', onDelete: 'CASCADE' })
  };
  return Riegos;
};