const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SupportDetail = sequelize.define('supportdetails', {
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
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'supportdetails',
    freezeTableName: true
  }
  );
  
  return SupportDetail;
};
