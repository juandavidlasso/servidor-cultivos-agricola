'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tablones = sequelize.define('Tablones', {
    id_tablon: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
<<<<<<< HEAD
    corte_id: {
=======
    suerte_id: {
>>>>>>> e647131971aeb667a205d688b46ac6103896c168
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  Tablones.associate = function(models) {
<<<<<<< HEAD
    // tablones pertenece a un corte
    Tablones.belongsTo(models.Cortes, { as: 'cortePapa', foreignKey: 'corte_id', onDelete: 'CASCADE' })
=======
    // tablones pertenece a una suerte
    Tablones.belongsTo(models.Suertes, { as: 'suertePapa', foreignKey: 'suerte_id' , onDelete: 'CASCADE'} )
>>>>>>> e647131971aeb667a205d688b46ac6103896c168
    // tablones tiene muchas aplicacion plaga
    Tablones.hasMany(models.Aplicacion_plagas, { foreignKey: 'tablon_id' } )
  };
  return Tablones;
};