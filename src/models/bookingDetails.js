const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BookingDetail = sequelize.define('BookingDetails', {
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Booking', // Assuming your Category model name is 'Category' and table name is 'Categories'
        key: 'id'
      }
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Room', // Assuming your Category model name is 'Category' and table name is 'Categories'
        key: 'id'
      }
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
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },{
    tableName: 'BookingDetail',
    freezeTableName: true
  }
);

BookingDetail.associate = function(models) {
  BookingDetail.belongsTo(models.Room, {
      foreignKey: 'id',
      // onDelete: 'CASCADE'
  });
};

BookingDetail.associate = function(models) {
  BookingDetail.belongsTo(models.Booking, {
      foreignKey: 'id',
      // onDelete: 'CASCADE'
  })
};
  return BookingDetail;
};
