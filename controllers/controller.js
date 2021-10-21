const { User, Profile, Comment, Post } = require("../models/index");
const { Op } = require("sequelize");
var bcrypt = require("bcryptjs");
var axios = require("axios")
const session = require("express-session");
const dateFormat = require('../helpers/dateFormat')

class Controller {
    static home(req,res){
      let data = {}
      Post.findAll()
      .then((dataPost) => {
        data.dataPost = dataPost
        return User.countUser()
      })
      .then((dataUser) => {
        data.dataUser = dataUser
        res.render("home", { data });
      })
      .catch((error) => {
        res.send(error);
      });
    }

    static loginForm(req, res){
        res.render('loginForm')
    }

    static registerUserForm(req,res){
        let errors
        if(req.query.errors){
            errors = req.query.errors
        }
        res.render('registerForm', {errors})
    }

    static loginPost(req, res) {
        User.findOne({
          where: {
            email: req.body.email
          },
        })        
        .then((data) => {
          let msg = "Email / Password SALAH!"
          if (!data) {
            res.render("loginForm.ejs", {msg});
          } else {
            const password = bcrypt.compareSync(req.body.password, data.password); // true
            if (password) {
              data.getProfile()
              .then((profile) => {
                req.session.sessionData = {
                  isLogin: true,
                  id: data.id,
                  fullName: profile.fullName,
                  username: data.username,
                  email: data.email,
                  birthDate: profile.birthDate,
                  zodiac: profile.zodiac,
                }
                // console.log("masuk sini");
                res.redirect(`/posts`)
              })
            } else {
              res.render("loginForm.ejs", {msg});
            }
          }
        })
        .catch((err) => {
          res.send(err)
        });
      }
    
    static logOut(req, res){
        req.session.destroy()
        res.redirect('/')
    }

    static registerUserPost(req, res) {
        let { email, username, password, fullName, birthDate, zodiac } = req.body;
        User.create({email, password, username})
        .then((data) => {
          let UserId = data.id
          return Profile.create({fullName, birthDate, zodiac, UserId})
        })
        .then(() => {
            res.redirect("/login")
        })
        .catch((err) => {
            res.redirect(`/register?errors=${err}`)
        })
    }

    static listPosts(req,res){
      let getHoroscope = axios({
        method: 'POST',
        url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
        params: {sign: req.session.sessionData.zodiac, day: 'today'},
        headers: {
          'x-rapidapi-host': 'sameer-kumar-aztro-v1.p.rapidapi.com',
          'x-rapidapi-key': '6314a2a7f0msh0318f1e751f3c9ap1c1813jsn30e7a2085424'
        }
      })
      let data = {}
      if(req.query.tag){
        Post.findAll({
          where: {
            "tag": { [Op.iLike]: `%${req.query.tag}%` } },
            include: [{model: User}],
            order: [['createdAt','DESC']]
        })
        .then((dataPost) => {
          data.dataPost = dataPost
          return getHoroscope
        })
        .then((dataZodiac) => {
          data.dataZodiac = dataZodiac
          res.render('timelinePost', {data, dateFormat})  
        })
        .catch((err) => {
            res.send(err)
        })
      } else {
        Post.findAll({
            include: [{model: User}],
            order: [['createdAt','DESC']]
        })
        .then((dataPost) => {
          data.dataPost = dataPost
          return getHoroscope
        })
        .then((dataZodiac) => {
          data.dataZodiac = dataZodiac
          res.render('timelinePost', {data, dateFormat})  
        })
        .catch((err) => {
            res.send(err)
        })
      }
    }

    static addPostForm(req,res){
      let errors
        if(req.query.errors){
            errors = req.query.errors
        }
      res.render("addPostForm.ejs", {errors})
    }

    static addPost(req,res){
      let {title, image, content, tag} = req.body
      let UserId = req.session.sessionData.id
      Post.create({title, image, content, tag, UserId})
      .then(() => {
        res.redirect('/posts')
      })
      .catch(err => {
        res.redirect(`/add-post?errors=${err}`)
      })
    }

    static likePost(req,res){
      Post.increment('postLike',
        {by: 1, 
        where: {
            id: req.params.PostId,
        }})
        .then(data => {
            res.redirect(`/posts`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static dislikePost(req,res){
      Post.increment('postDislike',
        {by: 1, 
        where: {
            id: req.params.PostId,
        }})
        .then(data => {
            res.redirect(`/posts`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static commentForm(req,res){
      let data = {}
      Post.findByPk(req.params.PostId)
      .then((dataPost) => {
        data.dataPost = dataPost
        return Comment.findAll({
          where:{PostId: req.params.PostId},
          include: {model: User}
        })
      })
      .then((dataComment) => {
        data.dataComment = dataComment
        res.render('postDetail', {data, })
      })
      .catch(err => {
        res.send(err)
      })
    }

    static commentPost(req,res){
      let {reply} = req.body
      let UserId = req.session.sessionData.id
      let PostId = req.params.PostId
      Comment.create({reply, UserId, PostId})
      .then((data) => {
        console.log(data);
        res.redirect(`/posts/${req.params.PostId}`)
      })
      .catch(err => {
        res.send(err)
      })
    }

    static likeComment(req,res){
      Comment.increment('commentLike',
        {by: 1, 
        where: {
            id: req.params.CommentId,
        }})
        .then(data => {
            res.redirect(`/posts/${req.params.PostId}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static dislikeComment(req,res){
      Comment.increment('commentDislike',
        {by: 1, 
        where: {
            id: req.params.CommentId,
        }})
        .then(data => {
            res.redirect(`/posts/${req.params.PostId}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static myPost(req, res){
      Post.findAll({
        where: {UserId: req.session.sessionData.id}
      })
      .then(data => {
        res.render('myPost', {data, dateFormat})
      })
      .catch(err => {
        res.send(err)
      })
    }

    static myPostDelete(req,res){
      Comment.destroy({
        where: {
          [Op.and]: [
            { UserId: req.session.sessionData.id },
            { PostId: req.params.PostId }
          ]
        }
      })
      .then(data => {
        return Post.destroy({
          where: {
            [Op.and]: [
              { UserId: req.session.sessionData.id },
              { id: req.params.PostId }
            ]
          }
        })    
      })
      .then(() => {
        res.redirect(`/posts/mypost/${req.session.sessionData.id}`)
      })
      .catch(err => {
        res.send(err)
      })
    }

    static editProfileForm (req, res) {
      res.render('editProfileForm', {dateFormat})
    }

    static editProfilePost (req, res) {
      let { UserId } = req.session.sessionData.id
      let { fullName, birthDate, zodiac } = req.body
      let params = { fullName, birthDate, zodiac, UserId } 
      Profile.update(params, {
        where: {
          id: req.session.sessionData.id
        }
      })
      .then(() => res.redirect(`/posts/mypost/${req.session.sessionData.id}`))
      .catch((err) => res.send(err))
    }
}

module.exports = Controller