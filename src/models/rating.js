const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Rating = sequelize.define('Rating', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // Assuming your Category model name is 'Category' and table name is 'Categories'
        key: 'id'
      } 
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Ratings',
    freezeTableName: true
  });

  Rating.associate = function(models) {
    Rating.belongsTo(models.User, {
        foreignKey: 'id',
        // onDelete: 'CASCADE'
    });
  };
  return Rating;
};
