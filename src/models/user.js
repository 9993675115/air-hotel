module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
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
        defaultValue: 'user'
      },
      // settings: {
      //   type: DataTypes.JSONB
      // },
      status: {
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
