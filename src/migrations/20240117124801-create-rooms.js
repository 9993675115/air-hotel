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
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      roomNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      roomTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
