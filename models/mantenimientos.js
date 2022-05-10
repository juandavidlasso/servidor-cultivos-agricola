'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mantenimientos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mantenimientos.belongsTo(models.Insumos, { foreignKey: 'insumoId', onDelete: 'CASCADE' })
      Mantenimientos.belongsTo(models.Maquinarias, { foreignKey: 'maquinariaId', onDelete: 'CASCADE' })
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
      allowNull: false
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
    maquinariaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, { sequelize, modelName: 'Mantenimientos', timestamps: false });
  return Mantenimientos;
};