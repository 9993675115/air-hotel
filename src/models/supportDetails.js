const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SupportDetail = sequelize.define('SupportDetail', {
    supportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  }
  );
  
  return SupportDetail;
};
