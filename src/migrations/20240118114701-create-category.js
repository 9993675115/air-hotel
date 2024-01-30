module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Categories', {
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
        image: {
          allowNull: false,
          type: Sequelize.STRING
        },
        isActive: {
          allowNull: true,
          type: Sequelize.BOOLEAN
        },
        icon: {
          allowNull: true,
          type: Sequelize.STRING
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
      return queryInterface.dropTable('Categories');
    }
  };
  