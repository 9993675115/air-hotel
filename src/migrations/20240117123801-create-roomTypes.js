module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('RoomTypes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        typeName: {
          allowNull: false,
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
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
      return queryInterface.dropTable('RoomTypes');
    }
  };
  