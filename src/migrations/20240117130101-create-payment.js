module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Payment', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Users', // Assuming you have a 'users' table
            key: 'id'
          }
        },
        bookingId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          
        },
        paymentResponse: {
          allowNull: false,
          type: Sequelize.TEXT
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
      return queryInterface.dropTable('Payment');
    }
  };
  