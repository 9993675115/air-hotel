// models/category.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  icon: {
    type: DataTypes.STRING,
    defaultValue: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'Categories',
  freezeTableName: true
});



Category.associate = function(models) {
  Category.hasOne(models.Hotel, {
      foreignKey: 'id',
      as: 'categoryId'
  });
};

// Category.hasMany(Hotel, { foreignKey: 'Category', as: 'Hotel' });

return Category;
}