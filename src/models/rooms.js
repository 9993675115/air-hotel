const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Room = sequelize.define('Room', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    hotelId: {  // Add this foreign key
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Hotel', // Assuming your Category model name is 'Category' and table name is 'Categories'
        key: 'id'
      } 
    },
    roomNumber: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    roomTypeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    extraMattress: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    extraMattressCharge: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    perNightCharge: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    monthlyCharge: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    weeklyCharge: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    numberOfGuest: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    numberOfChildren: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    selectAmenities: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    image: {
      allowNull: false,
      type: DataTypes.JSON
    },
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
    tableName: 'Rooms',
    freezeTableName: true
  }
  );

  Room.associate = function(models) {
    Room.belongsTo(models.Hotel, {
        foreignKey: 'id',
        // onDelete: 'CASCADE'
    });
  };

  Room.associate = function(models) {
    Room.hasOne(models.Booking, {
        foreignKey: 'id',
        as: 'roomId'
    });
  };
  return Room;
};
