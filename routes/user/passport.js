var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;

var User = require('../../models/User');
var Product = require('../../models/Product');
var config = require('../../config/index');

module.exports = function(passport){
    passport.use(new Strategy(
        function(token, done) {
            User.findOne({
                token: token
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));
};