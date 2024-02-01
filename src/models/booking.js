const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Booking = sequelize.define(
    'Booking',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      checkInDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      adult: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      children: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalRoom: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roomQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Room',
          key: 'id',
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: 'Bookings',
      freezeTableName: true,
    }
  );

  Booking.associate = function (models) {
    Booking.belongsTo(models.User, {
      foreignKey: 'id',
      // onDelete: 'CASCADE'
    });

    Booking.belongsTo(models.Room, {
      foreignKey: 'id',
      // onDelete: 'CASCADE'
    });

    Booking.hasOne(models.Payment, {
      foreignKey: 'id',
      // as: 'payment'
    });
  };

  return Booking;
};
