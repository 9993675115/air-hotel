module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      planName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      period: {
        allowNull: false,
        type: Sequelize.STRING
      },
      noOfHotels: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      currencyType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      paymentMethod: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      autoRenew: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      subscriptionType: {
        allowNull: false,
        type: Sequelize.STRING,
      },      
      status: {
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
    return queryInterface.dropTable('Subscriptions');
  }
};
