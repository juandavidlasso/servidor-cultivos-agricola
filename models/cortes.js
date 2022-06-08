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
    area: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    suerte_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  Cortes.associate = function(models) {
    // corte pertenece a una suerte
    Cortes.belongsTo(models.Suertes, { as: 'suertePadre', foreignKey: 'suerte_id', onDelete: 'CASCADE' })
    // corte tiene muchas aplicaciones plagas
    Cortes.hasMany(models.Aplicacion_plagas, { foreignKey: 'corte_id' })
    // corte tiene muchss aplicaciones fertilizantes
    Cortes.hasMany(models.Aplicacion_fertilizantes, { as: 'listAplicacionFertilizante', foreignKey: 'corte_id' })
    // corte tiene muchas labores
    Cortes.hasMany(models.Labores, { foreignKey: 'corte_id' })
    // corte tiene muchas cosechas
    Cortes.hasMany(models.Cosechas, { as: 'listcosechas', foreignKey: 'corte_id' })
    // corte tiene muchas aplicaciones herbicidas
    Cortes.hasMany(models.Aplicacion_herbicidas, { as: 'listAplicacionHerbicida', foreignKey: 'corte_id' })
    // corte tiene muchos tablones
    Cortes.hasMany(models.Tablones, { as: 'listTablones', foreignKey: 'corte_id' })
    // corte tiene muchos riegos
    Cortes.hasMany(models.Riegos, { foreignKey: 'corte_id' })
  };
  return Cortes;
};
