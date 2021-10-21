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

    get dateConverter(){
      let timePublish = new Date(this.createdAt)
      let timeNow = new Date()
      let hours = timeNow.getHours() - timePublish.getHours()
      if(hours >= 1){
          return `${hours} hours ago`
      }
      if(hours < 1){
          let minutes = timeNow.getMinutes() - timePublish.getMinutes()
          if(minutes < 0){
              return `${minutes + 60} minutes ago`
          } else {
              return `${minutes} minutes ago`
          }
      }
    }
    
  };
  Post.init({
    title: { type: DataTypes.STRING, 
      validate: { notEmpty: {
        msg: "Title Harus diisi"
      }}
    },
    image: { type: DataTypes.STRING, 
      validate: { notEmpty: {
        msg: "Image Harus diisi"
      }}
    },
    content: { type: DataTypes.TEXT,
      validate: { notEmpty: {
        msg: "Konten harus diisi"
      }}
    },
    tag: { type: DataTypes.STRING, 
      validate: { notEmpty: {
        msg: "Tag Harus diisi"
      }}
    },
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