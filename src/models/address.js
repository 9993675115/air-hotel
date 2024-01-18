const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Address = sequelize.define('Address', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  defaultAddress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'Address',
  timestamps: true,
});

return Address;
};
