module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('hotels', {
      // ... (existing columns)

      // New columns
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pincode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      distanceFromAirport: {
        allowNull: false,
        type: Sequelize.STRING
      },
      distanceFromCenter: {
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numberOfRoom: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      startingPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      checkInTime: {
        allowNull: false,
        type: Sequelize.TIME
      },
      checkOutTime: {
        allowNull: false,
        type: Sequelize.TIME
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      selectFacility: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },

      // ... (existing columns)

    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('hotels');
  }
};
