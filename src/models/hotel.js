const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
const Hotel = sequelize.define('Hotel', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  // ... (other existing columns)

  // New columns
  address: {
    allowNull: false,
    type: DataTypes.STRING
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING
  },
  state: {
    allowNull: false,
    type: DataTypes.STRING
  },
  country: {
    allowNull: false,
    type: DataTypes.STRING
  },
  pincode: {
    allowNull: false,
    type: DataTypes.STRING
  },
  distanceFromAirport: {
    allowNull: false,
    type: DataTypes.STRING
  },
  distanceFromCenter: {
    allowNull: false,
    type: DataTypes.STRING
  },
  location: {
    allowNull: false,
    type: DataTypes.STRING
  },
  numberOfRoom: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  startingPrice: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  checkInTime: {
    allowNull: false,
    type: DataTypes.TIME
  },
  checkOutTime: {
    allowNull: false,
    type: DataTypes.TIME
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  selectFacility: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.STRING)
  },

  // ... (other existing columns)

  // Timestamps
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
  }, {
    tableName: 'hotels',
    freezeTableName: true
  });
  return Hotel;
}