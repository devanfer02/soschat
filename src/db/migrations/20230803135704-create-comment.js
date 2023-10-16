'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      postId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'Posts',
            key: 'id'
        },
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'CASCADE'
      },
      commentId: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
            model: 'Comments',
            key: 'id',
        },
        onDelete: 'CASCADE'
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      liked: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      totalChained: {
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
    await queryInterface.dropTable('Comments');
  }
};