const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
const Hotel = sequelize.define('Hotel', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId:{
    type: DataTypes.INTEGER,
    references: {
      model: 'User', // Assuming your Category model name is 'Category' and table name is 'Categories'
      key: 'id'
    } 
  },
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
  featureImage: {
    type: DataTypes.JSON 
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
    type: DataTypes.DATE
  },
  checkOutTime: {
    allowNull: false,
    type: DataTypes.DATE
  },
  image: {
    type: DataTypes.STRING,
    // defaultValue: null,
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
    defaultValue: true,
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
      foreignKey: 'categoryId', // Correct foreign key
    });
    Hotel.hasMany(models.Room, {
      foreignKey: 'hotelId',
      // Correct foreign key for Room association
    });
    Hotel.belongsTo(models.User, {
      foreignKey: 'userId',
      // Correct foreign key for Room association
    });
  };
  // Hotel.belongsTo(Category, { foreignKey: 'Category', as: 'Category' });
  return Hotel;
}