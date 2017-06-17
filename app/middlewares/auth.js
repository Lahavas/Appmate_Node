// const Models = require('./models');
//
// const passport = require('passport');
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
//
// const secretKey = 'secret';
//
// const opts = {
//     jwtFromRequest: ExtractJwt.fromHeader('authorization'),
//     secretOrKey: secretKey
// }
//
// module.exports = () => {
//
//   passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
//     try {
//       const user = Models.User.findOne({
//         where: {
//           id: jwt_payload.id
//         }
//       });
//
//       if (user) {
//         done(null, {
//           // In Token
//         });
//       } else {
//         done(null, false);
//       }
//     }
//     catch (error) {
//       return done(error, false);
//     }
//   });
//
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     // 인증 통과! - Strategy의 콜백으로 전달된 user는 req.user로 사용
//     res.send({msg:'success', data: 'private data.', username:req.user.name});
//   }
// };
