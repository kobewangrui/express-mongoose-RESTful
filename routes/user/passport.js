var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;

var User = require('../../models/User');
var Product = require('../../models/Product');
var config = require('../../config/index');

module.exports = (passport)=>{
    passport.use(new Strategy(
        //user表权限设置
        (token, done)=>{
            User.findOne({
                token: token
            }, (err, user)=>{
                if(err){
                    return done(err);
                }
                if(!user){
                    return done(null, false);
                }
                return done(null, user);
            });
        },
        //product权限设置
        (token, done)=>{
            Product.findOne({
                token: token
            }, (err, user)=>{
                if(err){
                    return done(err);
                }
                if(!user){
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));
};