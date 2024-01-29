const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Payment = sequelize.define('Payment', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', 
        key: 'id'
      }
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Booking', 
        key: 'id'
      }
    },
    paymentResponse: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'Payments',
    freezeTableName: true
  }
);

Payment.associate = function(models) {
  Payment.belongsTo(models.User, {
    foreignKey: 'id', // Correct foreign key
  });
}

Payment.associate = function(models) {
  Payment.belongsTo(models.Booking, {
    foreignKey: 'id', // Correct foreign key
  });
}

  return Payment;
};
