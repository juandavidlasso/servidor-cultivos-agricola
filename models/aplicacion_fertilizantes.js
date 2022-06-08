'use strict';
module.exports = (sequelize, DataTypes) => {
  const Aplicacion_fertilizantes = sequelize.define('Aplicacion_fertilizantes', {
    id_apfe: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    corte_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  Aplicacion_fertilizantes.associate = function(models) {
    // aplicacion fertilizantes pertenece a un corte
    Aplicacion_fertilizantes.belongsTo(models.Cortes, { foreignKey: 'corte_id', onDelete: 'CASCADE' })
    // aplicacion fertilizante tiene muchos tratamientos fertilizantes
    Aplicacion_fertilizantes.hasMany(models.Tratamiento_fertilizantes, { as: 'listTratamientoFertilizante', foreignKey: 'apfe_id', onDelete: 'CASCADE' })
  };
  return Aplicacion_fertilizantes;
};
