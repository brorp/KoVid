'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: "UserId" });
      Post.hasMany(models.Comment, { foreignKey: "PostId" })
    }
  };
  Post.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    content: DataTypes.TEXT,
    tag: DataTypes.STRING,
    postLike: DataTypes.INTEGER,
    postDislike: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, { hooks: { 
    beforeCreate: (post, option) => {
      post.postLike = 0
      post.postDislike = 0
    }
   },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};