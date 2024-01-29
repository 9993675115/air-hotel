const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SupportDetail = sequelize.define('SupportDetail', {
    supportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      type: DataTypes.INTEGER,
    references: {
      model: 'Support', 
      key: 'id'
    }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sentBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'SupportDetails',
    freezeTableName: true
  });
  
  SupportDetail.associate = function(models) {
    SupportDetail.belongsTo(models.Support, {
      foreignKey: 'supportId', // Correct foreign key
    });
  }

  return SupportDetail;
};
