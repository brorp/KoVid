'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: "UserId" });
      Comment.belongsTo(models.Post, { foreignKey: "PostId" });  
    }
  };
  Comment.init({
    reply: DataTypes.TEXT,
    commentLike: DataTypes.INTEGER,
    commentDislike: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, { hooks: { 
    beforeCreate: (comment, option) => {
      comment.commentLike = 0
      comment.commentDislike = 0
    }
   },
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};