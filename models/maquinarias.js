'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Maquinarias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Maquinarias.hasMany(models.Mantenimientos, { as: 'listMantenimientos', foreignKey: 'maquinariaId', onDelete: 'CASCADE'})
    }
  }
  Maquinarias.init({
    idMaquinaria: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modelo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    potencia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { sequelize, modelName: 'Maquinarias', timestamps: false });
  return Maquinarias;
};