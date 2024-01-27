const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const RoomType = sequelize.define('RoomTypes', {
    typeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
    tableName: 'RoomTypes',
    freezeTableName: true
  }
);

  // Add associations if needed

  return RoomType;
};
