'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Insumos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Insumos.hasMany(models.Mantenimientos, { as: 'listInsumos', foreignKey: 'insumoId', onDelete: 'CASCADE'})
    }
  }
  Insumos.init({
    idInsumo: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    referencia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { sequelize, modelName: 'Insumos', timestamps: false });
  return Insumos;
};