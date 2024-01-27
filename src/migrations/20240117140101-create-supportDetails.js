module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('SupportDetails', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        supportId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          
        },
        description: {
          allowNull: false,
          type: Sequelize.TEXT
        },
        sentBy: {
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
      return queryInterface.dropTable('SupportDetails');
    }
  };
  