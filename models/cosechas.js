'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cosechas = sequelize.define('Cosechas', {
    id_cosecha: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    rendimiento: {
      type: DataTypes.FLOAT
    },
    numeroVagones: {
      type: DataTypes.INTEGER,
    },
    numeroMulas: {
      type: DataTypes.INTEGER,
    },
    corte_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: false });
  Cosechas.associate = function(models) {
    // cosechas pertenece a un corte
    Cosechas.belongsTo(models.Cortes, { as: 'cortePadre', foreignKey: 'corte_id', onDelete: 'CASCADE'})
  };
  return Cosechas;
};
