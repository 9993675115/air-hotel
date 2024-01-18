const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Room = sequelize.define('Room', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Room',
    freezeTableName: true
  }
  );

  // Add associations if needed

  return Room;
};
