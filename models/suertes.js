'use strict';
module.exports = (sequelize, DataTypes) => {
  const Suertes = sequelize.define('Suertes', {
    id_suerte: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    variedad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zona: {
      type: DataTypes.STRING,
      allowNull: false
    },
    renovada: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  }, {});
  Suertes.associate = function(models) {
    // suerte tiene muchos cortes
    Suertes.hasMany(models.Cortes, { as:'listcortes', foreignKey:'suerte_id', onDelete: 'CASCADE' } )
  };
  return Suertes;
};
