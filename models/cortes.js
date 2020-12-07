'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cortes = sequelize.define('Cortes', {
    id_corte: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_siembra: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_corte: {
      type: DataTypes.DATEONLY
    },
    activo: {
      type: DataTypes.BOOLEAN
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
<<<<<<< HEAD
    area: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
=======
>>>>>>> e647131971aeb667a205d688b46ac6103896c168
    suerte_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  Cortes.associate = function(models) {
    // corte pertenece a una suerte
<<<<<<< HEAD
    Cortes.belongsTo(models.Suertes, { as: 'suertePadre', foreignKey: 'suerte_id',onDelete: 'CASCADE' })
=======
    Cortes.belongsTo(models.Suertes, { as: 'suertePadre', foreignKey: 'suerte_id',onDelete: 'CASCADE' } )
>>>>>>> e647131971aeb667a205d688b46ac6103896c168
    // corte tiene muchas aplicaciones plagas
    Cortes.hasMany(models.Aplicacion_plagas, { foreignKey: 'corte_id' })
    // corte tiene muchss aplicaciones fertilizantes
    Cortes.hasMany(models.Aplicacion_fertilizantes, { foreignKey: 'corte_id' })
    // corte tiene muchas labores
<<<<<<< HEAD
    Cortes.hasMany(models.Labores, { foreignKey: 'corte_id' })
    // corte tiene muchas cosechas
    Cortes.hasMany(models.Cosechas, { as: 'listcosechas', foreignKey: 'corte_id' })
    // corte tiene muchas aplicaciones herbicidas
    Cortes.hasMany(models.Aplicacion_herbicidas, { foreignKey: 'corte_id' })
    // corte tiene muchos tablones
    Cortes.hasMany(models.Tablones, { as: 'listTablones', foreignKey: 'corte_id' })
=======
    Cortes.hasMany(models.Labores, { foreignKey: 'corte_id'})
    // corte tiene muchas cosechas
    Cortes.hasMany(models.Cosechas, { as: 'listcosechas', foreignKey: 'corte_id'})
    // corte tiene muchas aplicaciones herbicidas
    Cortes.hasMany(models.Aplicacion_herbicidas, { foreignKey: 'corte_id' } )
>>>>>>> e647131971aeb667a205d688b46ac6103896c168

  };
  return Cortes;
};
