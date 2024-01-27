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
     // as: 'categoryId'
  });
};

// const storage = multer.diskStorage({
//   destination: './uploads/', // Set the destination folder for uploaded files
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// // Add a method to handle image upload
// Category.uploadImage = upload.single('image');

// Category.associate = function(models) {
//   Category.hasOne(models.Hotel, {
//     foreignKey: 'categoryId', // Use the correct foreign key
//   });
// };

return Category;
}