'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reply: {
        type: Sequelize.TEXT
      },
      commentLike: {
        type: Sequelize.INTEGER
      },
      commentDislike: {
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      },
      PostId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Posts",
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};