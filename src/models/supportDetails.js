const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SupportDetail = sequelize.define('Supportdetail', {
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
    tableName: 'Supportdetails',
    freezeTableName: true
  }
  );
  
  return SupportDetail;
};
