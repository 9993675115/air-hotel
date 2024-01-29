module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING // Add lastname column
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      isVerify: {
        type: Sequelize.BOOLEAN // Add isVerify column
      },
      Dob: {
        type: Sequelize.DATE // Assuming Date of Birth is a date column
      },
      country: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.JSON // Assuming image is a string path to the image file
      },
      featureImage: {
        type:  Sequelize.JSON  // Assuming featureImage is a string path to the feature image file
      },
      companyName: {
        type: Sequelize.STRING // Add companyName column
      },
      contact:{
        type: Sequelize.BIGINT
      },
      pincode: {
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      document: {
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
    }),
  down: (queryInterface) => queryInterface.dropTable('Users')
};
