module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING // Make sure the column name matches the migration file
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
        defaultValue: 'user'
      },
      Dob: {
        type: DataTypes.DATE
      },
      country: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.JSON // Assuming image is stored as JSON
      },
      featureImage: {
        type: DataTypes.JSON // Assuming featureImage is stored as JSON
      },
      companyName: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      contact:{
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
  User.associate = function(models) {
    User.hasMany(models.Booking, {
        foreignKey: 'userId'
    });
  };
   return User;
};
