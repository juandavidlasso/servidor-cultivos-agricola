'use strict';
module.exports = (sequelize, DataTypes) => {
  const Aplicacion_herbicidas = sequelize.define('Aplicacion_herbicidas', {
    id_aphe: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
  Aplicacion_herbicidas.associate = function(models) {
    // aplicacion herbicidas pertenece a un corte
    Aplicacion_herbicidas.belongsTo(models.Cortes, { foreignKey: 'corte_id',onDelete: 'CASCADE' } )
    // aplicacion herbicidas tiene muchos tratamientos herbicidas
    Aplicacion_herbicidas.hasMany(models.Tratamiento_herbicidas, { foreignKey: 'aphe_id' } )
  };
  return Aplicacion_herbicidas;
};
