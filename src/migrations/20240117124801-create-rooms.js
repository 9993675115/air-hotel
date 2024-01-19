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
  