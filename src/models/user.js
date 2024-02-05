module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'User'
      },
      Dob: {
        type: DataTypes.DATE
      },
      country: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.JSON
      },
      companyName: {
        type: DataTypes.STRING
      },
      pincode: {
        type: DataTypes.INTEGER,
        // defaultValue: 0
      },
      city: {
        type: DataTypes.STRING,
        // defaultValue: 0
      },
      document: {
        type: DataTypes.STRING,
        // defaultValue: 0
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      contact: {
        type: DataTypes.BIGINT
      },
      isVerify: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      defaultScope: {
        attributes: { exclude: ['password'] }
      },
      scopes: {
        withSecretColumns: {
          attributes: { include: ['password'] }
        }
      }
    }
  );
 
  User.associate = function (models) {
    User.hasMany(models.Booking, {
      foreignKey: 'id', // Correct the foreign key reference
    });
    User.hasMany(models.Hotel, {
      foreignKey: 'vendorId', // Correct the foreign key reference to hotelId
      // targetkey: 'id'
      // onDelete: 'CASCADE'
    });

    User.hasOne(models.Rating, {
      foreignKey: 'id', // Correct the foreign key reference
    });

    User.hasOne(models.Payment, {
      foreignKey: 'id', // Correct the foreign key reference
    });

    User.hasOne(models.Subscription, {
      foreignKey: 'id', // Correct the foreign key reference
    });
  };

   return User;
};
