const Models = require('../models');

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const authConfig = require('../config/auth.json');

const opts = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: authConfig.jwtSecret
}

module.exports = () => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await Models.User.findOne({
          where: {
            userSocial: jwt_payload.userSocial,
            userSocialId: jwt_payload.userSocialId,
            userName: jwt_payload.userName,
            userEmail: jwt_payload.userEmail
          }
        });

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      }
      catch (error) {
        return done(error, false);
      }
    }));

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate('jwt', authConfig.jwtSession);
        }
    };
};
