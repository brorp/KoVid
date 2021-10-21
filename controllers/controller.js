const { User, Profile, Comment, Post } = require("../models/index");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const dateConverter = require('../helpers/dateConverter')

class Controller {
    static home(req,res){
    Post.findAll()
      .then((data) => {
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
              const password = bcrypt.compareSync(req.body.password, data.password); 
              if (password) {
                data.getProfile()
                .then((profile) => {
                  req.session.sessionData = {
                    isLogin: true,
                    id: data.id,
                    email: data.email,
                    username: data.username,
                    fullName: profile.fullName,
                    birthDate: profile.birthDate,
                    zodiac: profile.zodiac,
                  }
                  res.redirect(`/posts`)
                })
              } else {
                res.send("email/pass salah");
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
        Post.findAll({
            include: {models: Comment}
        })
        .then((data) => {
            console.log(data)
            res.render('timelinePost', {data, dateConverter})
        })
        .catch((err) => {
            res.send(err)
        })
    }
}

module.exports = Controller