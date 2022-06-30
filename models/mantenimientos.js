'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mantenimientos extends Model {
    static associate(models) {
      Mantenimientos.belongsTo(models.Insumos, { as: 'insumoPadre', foreignKey: 'insumoId', onDelete: 'CASCADE' })
      Mantenimientos.belongsTo(models.Aplicacion_mantenimientos, { foreignKey: 'ApMantId', onDelete: 'CASCADE' })
    }
  }
  Mantenimientos.init({
    idMantenimiento: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    detalle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    horaCambio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    insumoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ApMantId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipoCambio: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    proximoCambio: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, { sequelize, modelName: 'Mantenimientos', timestamps: false });
  return Mantenimientos;
};