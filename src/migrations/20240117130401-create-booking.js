module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Bookings', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        checkInDate: {
          allowNull: false,
          type: Sequelize.DATE
        },
        checkOutDate: {
          allowNull: false,
          type: Sequelize.DATE
        },
        adult: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        children: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        price: {
          allowNull: false,
          type: Sequelize.FLOAT // Adjust the data type based on your requirements
        },
        totalPrice: {
          allowNull: false,
          type: Sequelize.FLOAT // Adjust the data type based on your requirements
        },
        totalRoom: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        roomQuantity: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          // references: {
          //   model: 'Users', // Assuming you have a 'users' table
          //   key: 'id'
          // }
        },
        roomId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          // references: {
          //   model: 'Rooms', // Assuming you have a 'rooms' table
          //   key: 'id'
          // }
        },
        address: {
          allowNull: false,
          type: Sequelize.STRING
        },
        status: {
          allowNull: false,
          type: Sequelize.BOOLEAN // Adjust the data type based on your requirements
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
      return queryInterface.dropTable('Bookings');
    }
  };
  