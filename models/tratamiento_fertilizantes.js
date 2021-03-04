'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tratamiento_fertilizantes = sequelize.define('Tratamiento_fertilizantes', {
    id_trafe: {
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
    apfe_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  Tratamiento_fertilizantes.associate = function(models) {
    // tratamiento fertilizantes pertenece a una aplicacion fertilizante
    Tratamiento_fertilizantes.belongsTo(models.Aplicacion_fertilizantes, { foreignKey: 'apfe_id' , onDelete: 'CASCADE'})
  };
  return Tratamiento_fertilizantes;
};
