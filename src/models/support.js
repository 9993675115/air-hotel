// const { DataTypes } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  const Support = sequelize.define('Support', {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
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
    tableName: 'supports',
    freezeTableName: true
  });

  return Support;
};
