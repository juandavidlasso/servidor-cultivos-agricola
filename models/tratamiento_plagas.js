'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tratamiento_plagas = sequelize.define('Tratamiento_plagas', {
    id_trapl: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    producto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    tiempo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: false });
  Tratamiento_plagas.associate = function(models) {
    // tratamiento plagas tiene muchas aplicacion plagas
    Tratamiento_plagas.hasMany(models.Aplicacion_plagas, { foreignKey: 'trapl_id', onDelete: 'CASCADE' } )
  };
  return Tratamiento_plagas;
};