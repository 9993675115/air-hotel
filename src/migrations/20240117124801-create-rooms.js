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
          references: {
            model: 'Users', // Assuming you have a 'users' table
            key: 'id'
          }
        },
        roomNumber: {
          allowNull: false,
          type: Sequelize.STRING
        },
        roomTypeId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'RoomTypes', // Assuming you have a 'roomTypes' table
            key: 'id'
          }
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
  