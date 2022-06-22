'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aplicacion_mantenimientos extends Model {
    static associate(models) {
      Aplicacion_mantenimientos.belongsTo(models.Maquinarias, { foreignKey: 'maquinariaId', onDelete: 'CASCADE' })
      Aplicacion_mantenimientos.hasMany(models.Mantenimientos, { as: 'listMantenimientos', foreignKey: 'ApMantId', onDelete: 'CASCADE' })
    }
  }
  Aplicacion_mantenimientos.init({
    idApMant: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    maquinariaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { sequelize, modelName: 'Aplicacion_mantenimientos', timestamps: false}
  );
  return Aplicacion_mantenimientos;
};