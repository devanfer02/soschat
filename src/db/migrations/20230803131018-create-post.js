'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      desc: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING
      },
      comments: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      liked: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};