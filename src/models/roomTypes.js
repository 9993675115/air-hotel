const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const RoomType = sequelize.define('RoomType', {
    typeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'RoomType',
    freezeTableName: true
  }
);

  // Add associations if needed

  return RoomType;
};
