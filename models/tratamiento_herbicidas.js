'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tratamiento_herbicidas = sequelize.define('Tratamiento_herbicidas', {
    id_trahe: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    producto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dosis: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    presentacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    aplico: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nota: {
      type: DataTypes.STRING
    },
    aphe_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  Tratamiento_herbicidas.associate = function(models) {
    // tratamiento herbicidas pertenece a una aplicacion herbicidas
    Tratamiento_herbicidas.belongsTo(models.Aplicacion_herbicidas, { foreignKey: 'aphe_id', onDelete: 'CASCADE' } )
  };
  return Tratamiento_herbicidas;
};
