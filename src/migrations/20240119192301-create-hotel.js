module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Hotels', {
      // ... (existing columns)

      // New columns
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },  
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories', // Assuming your Category model name is 'Category' and table name is 'Categories'
          key: 'id'
        } // 
        // refrences:{
        //   model:'Categories',
        //   key:'id'
        // }
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pincode: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      distanceFromAirport: {
        allowNull: false,
        type: Sequelize.STRING
      },
      distanceFromCenter: {
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numberOfRoom: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      startingPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      checkInTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      checkOutTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      featureImage: {
          type: Sequelize.JSON 
        },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      selectFacility: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
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
      // ... (existing columns)

    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Hotels');
  }
};
