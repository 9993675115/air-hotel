module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('supportdetails', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        supportId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'supports', // Assuming you have a 'supports' table
            key: 'id'
          }
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
      return queryInterface.dropTable('supportdetails');
    }
  };
  