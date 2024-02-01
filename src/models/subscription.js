// models/subscription.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Subscription = sequelize.define('Subscription', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    planName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    period: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    noOfHotels: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    currencyType: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    paymentMethod: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    autoRenew: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    subscriptionType: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'Subscriptions',
    freezeTableName: true
  });

  Subscription.associate = function(models) {
    Subscription.belongsTo(models.User, {
      foreignKey: 'id', // Correct foreign key
    });}

  return Subscription;
};
