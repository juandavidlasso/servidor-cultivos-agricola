'use strict';
module.exports = (sequelize, DataTypes) => {
  const Labores = sequelize.define('Labores', {
    id_labor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    actividad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    equipo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING
    },
    pases: {
      type: DataTypes.INTEGER
    },
    aplico: {
      type: DataTypes.STRING
    },
    costo: {
      type: DataTypes.FLOAT
    },
    nota: {
      type: DataTypes.STRING
    },
    corte_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  Labores.associate = function(models) {
    // labores pertenece a un corte
    Labores.belongsTo(models.Cortes, { foreignKey: 'corte_id' , onDelete: 'CASCADE'})
  };
  return Labores;
};
