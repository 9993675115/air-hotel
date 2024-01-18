const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BookingDetail = sequelize.define('BookingDetail', {
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    tableName: 'BookingDetail',
    freezeTableName: true
  }
);

  // Add associations if needed

  return BookingDetail;
};
