'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lluvias = sequelize.define('Lluvias', {
    id_lluvia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    pluviometro_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  Lluvias.associate = function(models) {
    // associations can be defined here
    Lluvias.belongsTo(models.Pluviometros, { as: 'PluviometroPadre', foreignKey: 'pluviometro_id' } )
  };
  return Lluvias;
};
