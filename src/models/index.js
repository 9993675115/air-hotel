const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

dotenv.config({ path: path.join(__dirname, '../../.env') });
const basename = path.basename(__filename);
const db = {};
const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 60000
  }
});
try {
  sequelize.authenticate();
} catch (err) {
 console.error('Unable to connect to the database:', err)
}
// ... (previous code)

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    try {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      if (model && model.name) {
        console.log(model.name);
        db[model.name] = model;
      } else {
        console.error(`Invalid model structure in file ${file}. Expected 'name' property.`);
      }
    } catch (error) {
      console.error(`Error loading model from file ${file}:`, error);
    }
  });

// ... (remaining code)


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;