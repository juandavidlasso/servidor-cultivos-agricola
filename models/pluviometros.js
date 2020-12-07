'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pluviometros = sequelize.define('Pluviometros', {
    id_pluviometro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  Pluviometros.associate = function(models) {
    // pluviometro tiene muchas lluvias
    Pluviometros.hasMany(models.Lluvias, { as:'listlluvias', foreignKey:'pluviometro_id' } )
  };
  return Pluviometros;
};
