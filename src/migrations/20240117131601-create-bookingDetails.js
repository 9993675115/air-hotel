module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('BookingDetail', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        bookingId: {
          allowNull: false,
          type: Sequelize.INTEGER,
         
        },
        roomId: {
          allowNull: false,
          type: Sequelize.INTEGER,
         
        },
        paymentType: {
          allowNull: false,
          type: Sequelize.STRING // Adjust the data type based on your requirements
        },
        amount: {
          allowNull: false,
          type: Sequelize.FLOAT // Adjust the data type based on your requirements
        },
        status: {
          allowNull: false,
          type: Sequelize.STRING // Adjust the data type based on your requirements
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
      return queryInterface.dropTable('BookingDetail');
    }
  };
  