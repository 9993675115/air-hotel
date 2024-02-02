// Update the 'Rooms' table migration file
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hotelId: {  // Add this foreign key
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      roomNumber: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      roomType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      roomType2: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      extraMattress: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      extraMattressCharge: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      perNightCharge: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      monthlyCharge: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      weeklyCharge: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      numberOfGuest: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      numberOfChildren: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      selectAmenities: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      image: {
        allowNull: false,
        type: Sequelize.JSON
      },
      featureImage: {
        type:  Sequelize.JSON  // Assuming featureImage is a string path to the feature image file
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Rooms');
  }
};
