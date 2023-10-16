'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('follows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      followerId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
      },
      followingId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
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
    await queryInterface.dropTable('Follows');
  }
};