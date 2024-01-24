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
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'Category', // Assuming your Category model name is 'Category' and table name is 'Categories'
      key: 'id'
    } // Adjust the data type based on your requirements
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
    type: DataTypes.INTEGER
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
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
  }, {
    tableName: 'Hotels',
    freezeTableName: true
  });

  

Hotel.associate = function(models) {
  Hotel.belongsTo(models.Category, {
      foreignKey: 'id',
      // onDelete: 'CASCADE'
  });
};
Hotel.associate = function(models) {
  Hotel.hasOne(models.Room, {
      foreignKey: 'id',
      as: 'hotelId'
  });
};

  // Hotel.belongsTo(Category, { foreignKey: 'Category', as: 'Category' });
  return Hotel;
}