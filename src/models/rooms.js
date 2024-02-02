const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Room = sequelize.define('Room', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    hotelId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Hotel',
        key: 'id'
      }
    },
    roomNumber: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    roomType: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    roomType2: {
      allowNull: false,
      type: DataTypes.STRING,
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
    featureImage: {
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
  });

  Room.associate = function(models) {
    Room.belongsTo(models.Hotel, {
      foreignKey: 'hotelId',
      targetkey: 'id'
      // onDelete: 'CASCADE'
    });

    Room.hasOne(models.Booking, {
      foreignKey: 'id'
    });

    Room.hasMany(models.BookingDetails, {
      foreignKey: 'id'
    });
  };

  return Room;
};
